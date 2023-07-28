import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./about.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import $ from 'jquery';

const cx = classNames.bind(styles);

function About() {
  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }, []);
  
  return (
    <main className={cx("aboutComponent")}>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0")}>About</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>About</span>
        </div>
      </div>
      <div className={cx("container mt-5", "box-main")}>
        <div className={cx("intro-company", "mb-5")}>
          <h3 className={cx("my-3")}>
            <b className={cx("position-relative px-3")}>La Imperial</b>
          </h3>
          <ul className="nav nav-pills mb-3 pb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={cx("nav-link", "active", "rounded-0")}
                id="introduction"
                data-toggle="pill"
                data-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                General introduction
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={cx("nav-link", "rounded-0")}
                id="contact"
                data-toggle="pill"
                data-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Contact Info
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="introduction"
            >
              <p className={cx("")}>
                <Link className={cx("text-dark")}>
                  <b>La Imperial</b>
                </Link>{" "}
                Company was established in 2004, is the exclusive distributor in
                Vietnam of household electrical products and kitchenware of La
                Imperial brand closer to consumers all over the country. La
                Imperial - Healty Living! Always focus on product quality and
                consumers' health. We always consider creativity and pioneering
                as our top goals. It is not only the pioneer in design
                innovation but also the creativity in the business philosophy:
                "Conquer customers with quality and service". For La Imperial
                Company, the trust and satisfaction of customers is the source
                of all success and development.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="contact"
            >
              <ul className={cx("list-unstyled")}>
                <li className={cx("d-flex")}>
                  <b className={cx("mr-2")}>Address: </b>
                  <p>
                    {" "}
                    HTC Building, 236B & 250 Hoang Quoc Viet, Tu Liem, Hanoi.
                  </p>
                </li>
                <li className={cx("d-flex")}>
                  <b className={cx("mr-2")}>Hotline: </b>
                  <p> (012)123456789/ (012)123456789</p>
                </li>
                <li className={cx("d-flex")}>
                  <b className={cx("mr-2")}>Email: </b>
                  <p> abc123@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("intro-member")}>
          <h3 className={cx("my-3")}>
            <b className={cx("position-relative px-3")}>Team words</b>
          </h3>
          <ul className="nav nav-pills mb-3 pb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={cx("nav-link", "active", "rounded-0")}
                id="memberone"
                data-toggle="pill"
                data-target="#pills-one"
                type="button"
                role="tab"
                aria-controls="pills-one"
                aria-selected="true"
              >
                Member <span>1</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={cx("nav-link", "rounded-0")}
                id="membertwo"
                data-toggle="pill"
                data-target="#pills-two"
                type="button"
                role="tab"
                aria-controls="pills-two"
                aria-selected="false"
              >
                Member <span>2</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={cx("nav-link")}
                id="memberthree"
                data-toggle="pill"
                data-target="#pills-three"
                type="button"
                role="tab"
                aria-controls="pills-three"
                aria-selected="false"
              >
                Member <span>3</span>
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-one"
              role="tabpanel"
              aria-labelledby="memberone"
            >
              <div
                className={cx(
                  "d-flex flex-column flex-lg-row align-items-center align-items-lg-start"
                )}
              >
                <div>
                  <img
                    src="../images/user.png"
                    alt="user"
                    className={cx("w-100")}
                  />
                </div>
                <div className={cx("mt-3 ml-lg-5 mt-lg-0")}>
                  <ul className={cx("list-unstyled")}>
                    <li>
                      <span>
                        <b>Fullname: </b>Nguyen Huu Hoang Thien
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Nickname: </b>LeoAce
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Address: </b>HTC Building, 236B & 250 Hoang Quoc
                        Viet, Tu Liem, Hanoi.
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Email: </b>abc123@gmail.com
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Phone: </b>(012)123456789
                      </span>
                    </li>
                    <li>
                      <span
                        className={cx(
                          "text-decoration-underline text-secondary"
                        )}
                      >
                        <i>Contact us to get the latest information.</i>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-two"
              role="tabpanel"
              aria-labelledby="membertwo"
            >
              <div
                className={cx(
                  "d-flex flex-column flex-lg-row align-items-center align-items-lg-start"
                )}
              >
                <div>
                  <img
                    src="../images/user.png"
                    alt="user"
                    className={cx("w-100")}
                  />
                </div>
                <div className={cx("mt-3 ml-lg-5 mt-lg-0")}>
                  <ul className={cx("list-unstyled")}>
                    <li>
                      <span>
                        <b>Fullname: </b>Ho Nhu Quy
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Nickname: </b>HoQuy
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Address: </b>HTC Building, 236B & 250 Hoang Quoc
                        Viet, Tu Liem, Hanoi.
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Email: </b>abc123@gmail.com
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Phone: </b>(012)123456789
                      </span>
                    </li>
                    <li>
                      <span
                        className={cx(
                          "text-decoration-underline text-secondary"
                        )}
                      >
                        <i>Contact us to get the latest information.</i>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-three"
              role="tabpanel"
              aria-labelledby="memberthree"
            >
              <div
                className={cx(
                  "d-flex flex-column flex-lg-row align-items-center align-items-lg-start"
                )}
              >
                <div>
                  <img
                    src="../images/user.png"
                    alt="user"
                    className={cx("w-100")}
                  />
                </div>
                <div className={cx("mt-3 ml-lg-5 mt-lg-0")}>
                  <ul className={cx("list-unstyled")}>
                    <li>
                      <span>
                        <b>Fullname: </b>Ngo Hong Quan
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Nickname: </b>HongQuan
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Address: </b>HTC Building, 236B & 250 Hoang Quoc
                        Viet, Tu Liem, Hanoi.
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Email: </b>abc123@gmail.com
                      </span>
                    </li>
                    <li>
                      <span>
                        <b>Phone: </b>(012)123456789
                      </span>
                    </li>
                    <li>
                      <span
                        className={cx(
                          "text-decoration-underline text-secondary"
                        )}
                      >
                        <i>Contact us to get the latest information.</i>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
