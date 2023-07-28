import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./contact.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { FaBell, FaLocationArrow, FaPhone, FaPhoneVolume } from "react-icons/fa";
import $ from 'jquery';

const cx = classNames.bind(styles);

function Contact() {
  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }, []);
  
  return (
    <main className={cx("contactComponent")}>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0")}>Contact Us</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>Contact</span>
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d312045.2365974162!2d105.56998662154722!3d21.046159785195368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab32dca597d5%3A0x2c1fc0c41b4139a9!2sHTC-B%C3%A1ch%20Khoa-Aptech!5e0!3m2!1svi!2s!4v1687189520285!5m2!1svi!2s"
          width="100%"
          height="550"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={cx("box-main" ,"container-fluid mt-5")}>
        <div className={cx("row d-flex")}>
          <div className={cx("col-lg-6 col-sm-12")}>
            <h4>
              <b>SEND US AN MESSAGE</b>
            </h4>
            <form action="" method="post" className={cx("form-contact", "w-100 mt-3")}>
              <div className={cx("form-group d-flex justify-content-between")}>
                <input
                  type="text"
                  name=""
                  placeholder="Name *"
                  className={cx("form-control p-4 w-50 mr-2")}
                  required
                />
                <input
                  type="number"
                  name=""
                  placeholder="Phone *"
                  className={cx("form-control p-4 w-50")}
                  required
                />
              </div>
              <div className={cx("form-group d-flex justify-content-between")}>
                <input
                  type="text"
                  name=""
                  placeholder="Email *"
                  className={cx("form-control p-4 w-50 mr-2")}
                  required
                />
                <input
                  type="text"
                  name=""
                  placeholder="Subject *"
                  className={cx("form-control p-4 w-50")}
                  required
                />
              </div>
              <div className={cx("form-group")}>
                <textarea rows="5" cols="" placeholder="Your message..." className={cx("form-control w-100 p-4")}></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
          <div className={cx("col-lg-6 col-sm-12 mt-5 mt-lg-0")}>
            <h4>
              <b>CONTACT US</b>
            </h4>
            <p className={cx("text-secondary")}>
              <small>
                If you want to know more about our policies, you can refer to
                our Terms and Conditions or contact us for advice and more
                information about services and offers. Thank you very much.
              </small>
            </p>
            <ul className={cx("list-unstyled")}>
              <li className={cx("d-flex")}>
                <FaLocationArrow fontSize={30} color="gray" className={cx("mr-4 my-2")} />
                <div>
                  <span>
                    <b>Address</b>
                  </span>
                  <p>
                    HTC Building, 236B & 250 Hoang Quoc Viet, Tu Liem, Hanoi,
                    Viet Nam.
                  </p>
                </div>
              </li>
              <li className={cx("d-flex")}>
                <FaPhone fontSize={30} color="gray" className={cx("mr-4 my-2")} />
                <div>
                  <span>
                    <b>Phone</b>
                  </span>
                  <p>(012)123456789</p>
                </div>
              </li>
              <li className={cx("d-flex")}>
                <FaBell fontSize={30} color="gray" className={cx("mr-4 my-2")} />
                <div>
                  <span>
                    <b>Hours</b>
                  </span>
                  <p>Monday to Saturday 08:00 - 22:00</p>
                </div>
              </li>
              <li className={cx("d-flex")}>
                <AiOutlineMail fontSize={30} color="gray" className={cx("mr-4 my-2")} />
                <div>
                  <span>
                    <b>Email</b>
                  </span>
                  <p>abc123@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
