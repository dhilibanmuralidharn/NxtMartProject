import React from 'react'

const NxtMartContext = React.createContext({
  cartList: [],
  removeCartItem: () => {},
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  clearCart: () => {},
})

export default NxtMartContext
