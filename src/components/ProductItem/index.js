import {useState, useContext, useEffect} from 'react'
import {MdCurrencyRupee} from 'react-icons/md'
import {GoPlus} from 'react-icons/go'
import {FaMinus} from 'react-icons/fa'

import NxtMartContext from '../../context/NxtMartContext'
import './index.css'

const ProductItem = props => {
  const {product} = props
  const {id, name, weight, price, image} = product
  const actualPrice = parseFloat(price.slice(1)).toFixed(2)

  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(NxtMartContext)

  const existingCartItem = cartList.filter(item => item.id === id)
  const initialQuantity = existingCartItem ? existingCartItem.quantity : 0

  const [quantity, setQuantity] = useState(initialQuantity)
  const [showQuantityControl, setShowQuantityControl] = useState(
    initialQuantity > 0,
  )

  useEffect(() => {
    if (quantity > 0) {
      setShowQuantityControl(true)
    } else {
      setShowQuantityControl(false)
    }
  }, [quantity])

  const handleAddToCart = () => {
    setQuantity(1)
    addCartItem({...product, quantity: 1})
  }

  const handleIncrement = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    incrementCartItemQuantity(id)
  }

  const handleDecrement = () => {
    const newQuantity = quantity - 1
    setQuantity(newQuantity)
    if (newQuantity === 0) {
      setShowQuantityControl(false)
    }
    decrementCartItemQuantity(id)
  }

  return (
    <div className="product-list-container">
      <li>
        <img src={image} alt={name} className="product-image" />
        <div className="content-container">
          <div>
            <p className="name">{name}</p>
            <p className="description">{weight}</p>
            <p className="price-tag">
              <MdCurrencyRupee /> {actualPrice}
            </p>
          </div>
          <div>
            <button
              data-testid="add-button"
              type="button"
              className={showQuantityControl ? 'not-show-add-btn' : 'add-btn'}
              onClick={handleAddToCart}
            >
              Add
            </button>
            {showQuantityControl && (
              <div className="button-container">
                <button
                  id={`decrement-count-${id}`}
                  data-testid="decrement-count"
                  type="button"
                  onClick={handleDecrement}
                  className="quantity-btn"
                  aria-label={`Decrease quantity of ${name}`}
                >
                  <FaMinus />
                </button>
                <button
                  id={`active-count-${id}`}
                  data-testid="active-count"
                  className="quantity-value-button"
                  aria-live="polite"
                  aria-label={`Current quantity of ${name}`}
                >
                  {quantity}
                </button>
                <button
                  id={`increment-count-${id}`}
                  type="button"
                  onClick={handleIncrement}
                  className="quantity-btn"
                  data-testid="increment-count"
                  aria-label={`Increase quantity of ${name}`}
                >
                  <GoPlus />
                </button>
              </div>
            )}
          </div>
        </div>
      </li>
    </div>
  )
}

export default ProductItem
