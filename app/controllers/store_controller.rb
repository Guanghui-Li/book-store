class StoreController < ApplicationController
  include CurrentCart
  before_action :set_cart
  
  def index
    @products = Product.order(popularity: :desc)
    if session[:counter] == nil
      session[:counter] = 0
    
    else
        session[:counter] += 1

        if session[:counter] > 5
          flash.now[:index] = "You have visited the page #{session[:counter]} times".pluralize{session[:counter]} + " without buying anything"      
        end
    end

    respond_to do |format|
      format.html {
          if (params[:spa] && params[:spa] == "true")
              @spa = true
              if current_account && current_account.accountable_type == "Buyer"
                @buyerName     = current_account.accountable.name
                @buyerAddress  = current_account.accountable.address
                @buyerEmail  = current_account.email
                @buyer_pay_type = current_account.accountable.pay_type.to_i
              end
              render 'index_spa'
          # the else case below is by default
          else
              render 'index'
          end
      }
      format.json {render json: Product.order(sort_by + ' ' + order)}
    end
  end

  def search
    products = Product.where("title LIKE '%#{params[:query]}%'")
    render json: products
  end

  private 
    def sort_by
       %w(title
          price
          popularity).include?(params[:sort_by]) ? params[:sort_by] : 'popularity'
    end
    def order
       %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
    end
end
