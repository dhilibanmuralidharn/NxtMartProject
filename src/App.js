import {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import LoginRoute from './components/LoginRoute'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import NxtMartContext from './context/NxtMartContext'
import './App.css'

const getLocalCartData = () => {
  const localCartData = localStorage.getItem('cartData')
  return localCartData ? JSON.parse(localCartData) : []
}

const App = () => {
  const [cartList, setCartList] = useState(getLocalCartData())

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
    console.log(cartList)
  }, [cartList])

  const addCartItem = product => {
    setCartList(prevCartList => {
      const existingItem = prevCartList.find(item => item.id === product.id)
      if (existingItem) {
        return prevCartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        )
      } else {
        return [...prevCartList, {...product, quantity: 1}]
      }
    })
    console.log(cartList)
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    )
  }

  const removeCartItem = id => {
    setCartList(prevCartList => {
      const updatedCartList = prevCartList.filter(item => item.id !== id)
      return updatedCartList
    })
  }

  return (
    <NxtMartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </NxtMartContext.Provider>
  )
}

export default App
