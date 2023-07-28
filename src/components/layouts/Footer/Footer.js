import React from 'react';
import classNames from 'classnames/bind';
import styles from './footer.module.css';
import logo from '../../../logo_white.png';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <>
      <footer className={cx("py-5")}>
        <div className={cx("container d-flex")}>
          <div className={cx("row")}>
            <div className={cx("col-lg-4 col-md-6 col-sm-12")}>
              <div className={cx("d-flex justify-content-start align-items-center")}>
                <Link to={'/'}>
                  <span className={cx("d-block m-0")}>
                    <img
                        src={logo}
                        alt="logo_white"
                        className={cx("w-100 rounded-circle")}
                      />
                  </span>
                </Link>
                <h2 className={cx("ml-3")}>Li Imperial</h2>
              </div>
              <ul className={cx("list-unstyled")}>
                <li>
                  <p className={cx("m-0 my-3")}><b>ADDRESS:</b> 250 Hoang quoc viet, cau giay - Ha Noi, Viet Nam.</p>
                </li>
                <li>
                  <p className={cx("m-0 my-3")}><b>PHONES:</b> (012) 123456789</p>
                </li>
                <li>
                  <p className={cx("m-0 my-3")}><b>E-MAIL:</b> username@gmail.com</p>
                </li>
              </ul>
            </div>
            <div className={cx("col-lg-2 col-md-6 col-sm-12", "box-menu")}>
              <h4 className={cx("mb-2")}>Menu main</h4>
              <ul className={cx("list-unstyled")}>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Specials</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>New Products</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Top Sellers</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Our Stores</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>About Us</Link>
                </li>
              </ul>
            </div>
            <div className={cx("col-lg-2 col-md-6 col-sm-12", "box-menu")}>
              <h4 className={cx("mb-2")}>Support</h4>
              <ul className={cx("list-unstyled")}>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Help Center</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Shopping guide</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Pays</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Customer care</Link>
                </li>
                <li className={cx("m-0 p-0")}>
                  <Link className={cx("text-decoration-none text-dark p-1 d-block", "item")}>Warranty Policy</Link>
                </li>
              </ul>
            </div>
            <div className={cx("col-lg-4 col-md-6 col-sm-12 d-flex flex-column align-items-between", "box-menu")}>
              <h4>Newsletter And Social</h4>
              <p className={cx("text-dark")}>Get E-mail updates about our latest shop and special offers.</p>
              <div className={cx("position-relative mb-2")}>
                <input type="text" name="email" placeholder='Enter your email address' className={cx("p-2 pl-3 position-absolute")} />
                <button type='button' className={cx("position-absolute p-2")}>SUBSCRIBE</button>
              </div>
              <ul className={cx("list-unstyled mt-5 d-flex")}>
                <li className={cx("mr-2 rounded-circle")}>
                  <Link className={cx("text-decoration-none text-light", "icon")}>
                    <FaFacebookF />
                  </Link>
                </li>
                <li className={cx("mr-2 rounded-circle")}>
                  <Link className={cx("text-decoration-none text-light", "icon")}>
                    <FaTwitter />
                  </Link>
                </li>
                <li className={cx("mr-2 rounded-circle")}>
                  <Link className={cx("text-decoration-none text-light", "icon")}>
                    <FaGooglePlusG />
                  </Link>
                </li>
                <li className={cx("mr-2 rounded-circle")}>
                  <Link className={cx("text-decoration-none text-light", "icon")}>
                    <FaInstagram />
                  </Link>
                </li>
                <li className={cx("mr-2 rounded-circle")}>
                  <Link className={cx("text-decoration-none text-light", "icon")}>
                    <FaYoutube />
                  </Link>
                </li>
              </ul>
            </div>  
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;