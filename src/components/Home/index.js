import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import SideBar from '../SideBar'
import ProductContainer from '../ProductContainer'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    productList: [],
    apiStatus: apiStatusConstants.initial,
    selectedCategory: 'All',
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    try {
      this.setState({apiStatus: apiStatusConstants.inProgress})

      const jwtToken = Cookies.get('jwt_token')
      if (!jwtToken) {
        throw new Error('JWT Token is missing')
      }

      const apiUrl =
        'https://run.mocky.io/v3/8177da5e-b2fd-4474-9bb7-457f4099ae4e'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data)

      const fetchedData = data.categories.map(category => ({
        categoryName: category.name,
        products: category.products.map(product => ({
          id: product.id,
          name: product.name,
          weight: product.weight,
          price: product.price,
          image: product.image,
        })),
      }))

      console.log(fetchedData)
      this.setState({
        productList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      console.error(error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleGetProduct = () => {
    this.getProducts()
  }

  handleActiveCatogory = categoryName => {
    this.setState({selectedCategory: categoryName})
  }

  renderSuccessView = () => {
    const {productList, selectedCategory} = this.state
    console.log(selectedCategory)

    return (
      <>
        <div className="success-container">
          <div>
            <ul className="sidebar-maincontainer">
              <h1 className="sidebar-heading">Categories</h1>
              <p
                className={
                  selectedCategory === 'All' ? 'isActive' : 'sidebar-category'
                }
                onClick={() => this.handleActiveCatogory('All')}
              >
                All
              </p>
              {productList.map(eachList => (
                <SideBar
                  eachList={eachList}
                  key={eachList.categoryName}
                  handleActiveCatogory={this.handleActiveCatogory}
                  isActive={selectedCategory === eachList.categoryName}
                />
              ))}
            </ul>
          </div>
          <div className="productList-container">
            <ul className="list-item-container">
              {productList.map(eachProduct => (
                <ProductContainer
                  productDetails={eachProduct}
                  key={eachProduct.categoryName}
                  selectedCategory={selectedCategory}
                />
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://i.postimg.cc/Y2NH70xS/Frame-12236.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={this.handleGetProduct}>
        Retry
      </button>
    </>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#339722" height={50} width={50} />
    </div>
  )

  renderProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <div>{this.renderProducts()}</div>
        </div>
      </div>
    )
  }
}
export default Home
