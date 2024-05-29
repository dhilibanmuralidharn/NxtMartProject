import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaRegUserCircle} from 'react-icons/fa'
import {CiLock} from 'react-icons/ci'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  handleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username">UserName</label>
        <div className="user-container">
          <FaRegUserCircle />
          <input
            type="text"
            value={username}
            placeholder="Username"
            id="username"
            onChange={this.onChangeUsername}
            className="input"
          />
        </div>
      </>
    )
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label htmlFor="password">Password</label>
        <div className="user-container">
          <CiLock />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Password"
            id="password"
            onChange={this.onChangePassword}
            className="input"
          />
        </div>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="main-container">
        <div>
          <form className="form-container" onSubmit={this.submitLoginForm}>
            <img
              src="https://i.postimg.cc/L81hBbhn/Logo-2.png"
              alt="login website logo"
              className="login-website-logo"
            />
            <div className="input-container">{this.renderUserNameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div>
              <input
                type="checkbox"
                id="showpassword"
                onClick={this.handleShowPassword}
              />
              <label htmlFor="showpassword">Show Password</label>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="errorMsg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
