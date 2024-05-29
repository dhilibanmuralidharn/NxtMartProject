import {useState, useEffect} from 'react'

import Header from '../Header'
import CartListView from '../CartListView'
import NxtMartContext from '../../context/NxtMartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import CartSuccessful from '../CartSuccessful'
import Footer from '../Footer'

import './index.css'

const Cart = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const handleCheckoutSuccess = () => {
    setCheckoutSuccess(true)
  }

  return (
    <NxtMartContext.Consumer>
      {value => {
        const {cartList = []} = value
        const showEmptyView = cartList.length === 0

        return (
          <div>
            <Header />
            {checkoutSuccess ? (
              <CartSuccessful />
            ) : (
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">Items</h1>
                    <CartListView cartList={cartList} />
                    <div className="cart-summary">
                      <CartSummary onCheckout={handleCheckoutSuccess} />
                    </div>
                  </div>
                )}
              </div>
            )}
            <Footer />
          </div>
        )
      }}
    </NxtMartContext.Consumer>
  )
}

export default Cart
