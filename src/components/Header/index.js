import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {CiLogout} from 'react-icons/ci'
import './index.css'

const Header = props => {
  const clickTologOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://i.postimg.cc/L81hBbhn/Logo-2.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="header-content-container">
        <Link to="/" style={{textDecoration: 'none'}} className="link-item">
          <button className="list-item">Home</button>
        </Link>
        <Link to="/cart" style={{textDecoration: 'none'}} className="link-item">
          <button className="list-item" style={{textDecoration: 'none'}}>
            Cart
          </button>
        </Link>
        <button className="logout-button" onClick={clickTologOut}>
          <CiLogout size={20} /> Logout
        </button>
      </ul>
    </div>
  )
}

export default withRouter(Header)
