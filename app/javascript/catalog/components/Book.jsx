import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
    price: PropTypes.number,
    popularity: PropTypes.number
  };

  // Add a new function to handle "Add to Cart"
  // All it does is that it calls the handleAddToCart function
  // in the BookList component above.
  handleAddToCart = (e) => {   
    this.props.handleAddToCart(this.props.book.id); 
  };  

  render = () => {
    return(
      <tr className="spa_entry">
        <td>
          <img src={this.props.book.image_url.url} height={176} width={147}/>
        </td>      
        <td>{this.props.book.title}</td>
        <td dangerouslySetInnerHTML={{__html: this.props.book.description}}></td>
        <td>{this.props.book.price}</td>
        <td className="ajaxPopularity">{Number(this.props.book.popularity)}</td>
        { this.props.seller ?  <td /> : 
          <td>
            <a className="btn btn-success"
              onClick={this.handleAddToCart} >
              Add to Cart
            </a>
        </td>  
        }     
      </tr>
    )
  };
}