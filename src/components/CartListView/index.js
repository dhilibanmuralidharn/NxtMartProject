import CartItem from '../CartItem'

import './index.css'

const CartListView = props => {
  const {cartList} = props

  return (
    <ul className="cart-list">
      {cartList.map(eachCartItem => (
        <div data-testid="cartItem">
          <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
        </div>
      ))}
    </ul>
  )
}

export default CartListView
