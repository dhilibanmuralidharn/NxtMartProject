import {IoIosArrowForward} from 'react-icons/io'
import ProductItem from '../ProductItem'
import './index.css'

const ProductContainer = props => {
  const {productDetails, selectedCategory} = props
  const {categoryName, products} = productDetails

  const filteredProducts =
    selectedCategory === 'All' || selectedCategory === categoryName
      ? products
      : []

  return (
    <div className="container">
      <div className="product-heading-container">
        <h1 className="product-header">
          {categoryName} <IoIosArrowForward size={20} />
        </h1>
      </div>
      <ul className="product-item-container">
        {filteredProducts.map(product => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    </div>
  )
}
export default ProductContainer
