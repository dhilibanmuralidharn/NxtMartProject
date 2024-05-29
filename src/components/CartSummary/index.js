import {useContext} from 'react'
import {MdCurrencyRupee} from 'react-icons/md'

import NxtMartContext from '../../context/NxtMartContext'

import './index.css'

const CartSummary = props => {
  const {cartList} = useContext(NxtMartContext)
  const {onCheckout} = props

  const totalQuantity = cartList.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const totalPrice = cartList.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0,
  )

  const handleCartFunction = () => {
    onCheckout()
  }

  return (
    <div className="summary-container">
      <div className="summary-content">
        <h1 data-testid="total-price" className="summary-details">
          Total ({totalQuantity} items):
        </h1>
        <p data-testid="total-price" className="summary-details">
          <MdCurrencyRupee /> {totalPrice.toFixed(2)}
        </p>
      </div>
      <button
        type="button"
        className="checkout-btn"
        onClick={handleCartFunction}
      >
        CheckOut
      </button>
    </div>
  )
}

export default CartSummary
