import {withRouter} from 'react-router-dom'
import './index.css'

const CartSuccessful = props => {
  const handleRetrunPage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="payment-done-container">
      <img src="https://i.postimg.cc/XYJdsk1s/Group-7417.png" alt="success" />
      <h1 className="payment-header">Payment Successful</h1>
      <p className="payment-description">Thank you for ordering.</p>
      <p className="payment-description">
        Your payment is successfully completed.
      </p>
      <button type="button" onClick={handleRetrunPage} className="btn">
        Return to Homepage
      </button>
    </div>
  )
}
export default withRouter(CartSuccessful)
