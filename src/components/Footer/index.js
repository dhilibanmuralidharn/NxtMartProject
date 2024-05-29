import {ImFacebook2} from 'react-icons/im'
import {FaInstagram} from 'react-icons/fa6'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer>
    <div>
      <p className="footer-p">
        For any queries, contact +91 9876543210 <br /> or mail us
        hlep@nxtmart.co.in
      </p>
      <div className="icon-container">
        <ImFacebook2 className="icons" />
        <FaInstagram className="icons" />
        <FaTwitter className="icons" />
      </div>
    </div>
    <p className="footer-p">
      Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd
    </p>
  </footer>
)
export default Footer
