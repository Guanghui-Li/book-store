import React from 'react';
import axios from 'axios';
import BookList from './BookList';
import SearchForm from './SearchForm';
import Cart from './Cart';

export default class Catalog extends React.Component {

    state = { books: [],
        sort: "popularity",
        order: "asc"
      };

    componentDidMount = () => {
        var self = this;

        axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
        axios.get('/')
            .then(function (response) {
                console.log(response.data);
                self.setState({ books: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    };  

    handleSortColumn = (name, order) => {
        if (this.state.sort != name) {
          order = 'asc';
        }
    
        var self = this;
    
        axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
        axios.get('/', {params: {sort_by: name, order: order }})
          .then(function (response) {
            console.log(response.data);
            self.setState({ books: response.data, sort: name, order: order });
          })
          .catch(function (error) {
            console.log(error);
            alert('Cannot sort events: ', error);
        });
    };

    handleSearch = (books) => {
        this.setState({ books: books });
    };

    // Add a new function to handle "Add to Cart"
    // This function will be modified later in section 3.3.2.
    handleAddToCart = (id) => {
        var self = this;
        axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
        axios.post('/line_items', {product_id: id})
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                self.refs.cart.handleAddToCart(response.data);
             })
            .catch(function (error) {
                console.log(error);
                alert('Cannot sort events: ', error);
        });
    
     };

    render = () => {
        // If there is true_cart_id from the Cancel Link (see OrderForm in the previous step), we will use it.
        // ES6 destructing assginment syntax
        var {true_cart_id} = this.props.location

        return (
            <div className="container">
                <div className="row">
                    <SearchForm handleSearch={this.handleSearch} />
                </div>
                <div className="row">
                    <div className="col-md-12 pull-right">
                    <Cart ref="cart" id={true_cart_id ? true_cart_id : this.props.cart_id} handlePopularity={this.handlePopularity} url={this.props.match.url}
                                                        buyerName={this.props.buyerName} buyerAddress={this.props.buyerAddress}
                                                        buyerEmail={this.props.buyerEmail} buyer_pay_type={this.props.buyer_pay_type}/>
                    </div>
                    <BookList books={this.state.books}
                                sort ={this.state.sort}
                                order={this.state.order}
                                seller={this.props.seller}
                                handleSortColumn={this.handleSortColumn}
                                handleAddToCart={this.handleAddToCart} />
                </div>
            </div>
        ); 
    };
}   