import React, { memo, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./header.module.css";
import logo from "../../../logo_white.png";
import flagEn from "../../../Flag_of_en.jpg";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaRegUser } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import $ from "jquery";
import { DelProductInCarts } from "../../../Services/AllSevice";
import { useDispatch, useSelector } from "react-redux";
import { deletePrdInCarts } from "../../../redux/reducers/carts";
import { MainData } from "../MainComponent";

const cx = classNames.bind(styles);

function Header() {
  const [wishlist, setWishlist] = useState([]);
  const [prdInCarts, setprdInCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const carts = useSelector((state) => state.carts);
  const wishlists = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { categories } = useContext(MainData);

  const boxMenu = useRef();
  const headerMenu = useRef();
  const buttonNavBar = useRef();
  const header_toggle = useRef();
  const linkDropdownShop = useRef();

  useEffect(() => {
    setWishlist(wishlists);
  }, [wishlists]);

  useEffect(() => {
    setprdInCarts(carts);
    setTotalPrice(carts.reduce((a, b) => a + b.totalPrice, 0));
  }, [carts]);

  useEffect(() => {
    // styles
    const body = document.getElementsByTagName("body")[0];
    window.onresize = () => {
      if (body.clientWidth >= 992) {
        boxMenu.current.setAttribute("style", "");
        headerMenu.current.style.boxShadow = '';
      } else {
        headerMenu.current.style.boxShadow = `0 0 4px #0000006e`;
      }
    };
    document.onclick = (e) => {
      const menuToggle = header_toggle.current.querySelector("div:first-child");
      if(buttonNavBar.current.contains(e.target) || linkDropdownShop.current.contains(e.target) || header_toggle.current.querySelector('div>ul>li:first-child').contains(e.target)) {
        header_toggle.current.setAttribute("style", `visibility: visible; opacity: 1;`);
        menuToggle.setAttribute("style", `transform: translateX(0);`);
      } else {
        header_toggle.current.setAttribute("style", ``);
        menuToggle.setAttribute("style", ``);
      }
    }
    // scroll
    document.onscroll = () => {
      if (window.scrollY >= 120) {
        headerMenu.current.classList.add("toggleHeader");
      } else {
        headerMenu.current.classList.remove("toggleHeader");
      }
      if (window.scrollY >= 500) {
        document.querySelector(".header_scrollTop").style.visibility =
          "visible";
      } else {
        document.querySelector(".header_scrollTop").style.visibility =
          "hidden";
      }
    };
  }, []);

  const handleFormSearch = (check) => {
    document.querySelector(".form-search_fixed").style.display = check
      ? "block"
      : "none";
  };

  const handleScrollTop = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  };

  // delete prd in cart
  const deletePrdInCart = (id_cart) => {
    carts.forEach((item, index) => {
      if (item.id_cart === id_cart) {
        DelProductInCarts(id_cart, (data) => {
          const action = deletePrdInCarts(index);
          dispatch(action);
        });
      }
    });
  };

  return (
    <>
      <header>
        <div className={cx("header-top", "bg-light p-2 d-none d-lg-block")}>
          <div
            className={cx(
              "d-flex justify-content-between container align-items-center"
            )}
          >
            <small className={cx("text-secondary mb-0 pb-0 d-block")}>
              Welcome to La Imperial store
            </small>
            <ul
              className={cx("list-unstyled d-flex align-items-center p-0 m-0")}
            >
              <li
                className={cx(
                  "dropdown",
                  "box-language",
                  "pr-3 position-relative"
                )}
              >
                <div className={cx("d-flex justify-content-center py-2")}>
                  <small className={cx("text-secondary mr-1")}>
                    Language:{" "}
                  </small>
                  <div className={cx("p-0 m-0 d-flex align-items-center")}>
                    <img src={flagEn} alt="Flag_of_en" className={cx("")} />
                    <small className={cx("text-secondary")}>English</small>
                  </div>
                </div>
              </li>
              <li
                className={cx(
                  "dropdown",
                  "box-currency",
                  "pl-3 position-relative"
                )}
              >
                <div className={cx("d-flex justify-content-center py-2")}>
                  <small className={cx("text-secondary mr-1")}>
                    Currency:{" "}
                  </small>
                  <div className={cx("p-0 m-0 d-flex align-items-center")}>
                    <small className={cx("text-secondary")}>$ USD</small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("header-menu", "w-100 bg-white")} ref={headerMenu}>
          <div className={cx("box-menu", "container")}>
            <nav className="navbar navbar-expand-lg navbar-light bg-white p-0 d-flex">
              <Link to={"/"} className={cx("p-0 py-2 mr-3 d-block col-2 col-lg-1 col-md-1 col-sm-2")}>
                <span id={cx("logo")} className={cx("d-block py-2 m-0 p-lg-0")}>
                  <img
                    src={logo}
                    alt="logo_white"
                    className={cx("w-100 rounded-circle")}
                  />
                </span>
              </Link>
              {/* <div
                className={cx(
                  "text-dark py-2 ml-auto mr-4 px-2 d-block d-lg-none",
                  "shopping-cart"
                )}
              >
                <div className={cx("position-relative text-dark")}>
                  <small
                    className={cx("position-absolute text-light bg-danger")}
                  >
                    {prdInCarts.length}
                  </small>
                  <AiOutlineShoppingCart />
                </div>
                <div className={cx("position-absolute p-3")}>
                  {prdInCarts.length === 0 ? (
                    <div className={cx("text-uppercase text-center")}>
                      No products in cart!
                    </div>
                  ) : (
                    <>
                      <div className={cx("box-prds", "pb-4")}>
                        {prdInCarts.map((item, index) => (
                          <div
                            className={cx("prd", "position-relative d-flex")}
                            key={index}
                          >
                            <Link
                              className={cx("my-2 mr-3")}
                              to={"/shop/detail/" + item.id}
                            >
                              <img src={item.thumbnail} alt={item.thumbnail} />
                            </Link>
                            <div className={cx("")}>
                              <Link
                                className={cx("name", "text-decoration-none")}
                                to={"/shop/detail/" + item.id}
                              >
                                <div className={cx("m-0 p-0")}>{item.name}</div>
                              </Link>
                              <span
                                className={cx("d-block text-dark", "quatity")}
                              >
                                Qty: {item.quantity}
                              </span>
                              <span className={cx("small")}>
                                <b>${item.price}</b>
                              </span>
                            </div>
                            <span
                              className={cx(
                                "delete",
                                "position-absolute border border-1 rounded-circle"
                              )}
                            >
                              <BsXLg
                                fontSize={20}
                                className={cx("icon-del")}
                                onClick={() => deletePrdInCart(item.id_cart)}
                              />
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className={cx("")}>
                        <div
                          className={cx(
                            "py-2 d-flex justify-content-between align-items-center"
                          )}
                        >
                          <span className={cx("small d-block")}>
                            <b className={cx("")}>Total:</b>
                          </span>
                          <span>${totalPrice}</span>
                        </div>
                        <div className={cx("d-flex justify-content-between")}>
                          <Link
                            className={cx(
                              "btnLink",
                              "w-50 text-center p-2 text-uppercase text-decoration-none text-light position-relative mr-2"
                            )}
                            to={"/shop/cart"}
                          >
                            view cart
                          </Link>
                          <Link
                            className={cx(
                              "btnLink",
                              "w-50 text-center p-2 text-uppercase text-decoration-none text-light position-relative"
                            )}
                            to={"/shop"}
                          >
                            check out
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div> */}
              <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
                ref={buttonNavBar}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={cx(
                  "collapse navbar-collapse",
                  "d-none justify-content-lg-between d-lg-flex"
                )}
                id={cx("collapsibleNavId")}
                ref={boxMenu}
              >
                {/* <div
                  className={cx("form-search", "d-block d-lg-none pt-2")}
                >
                  <form
                    action=""
                    className={cx("w-100 p-0 m-0 d-flex position-relative")}
                  >
                    <input
                      type="text"
                      name="q"
                      placeholder="Search here..."
                      className={cx("w-100 form-control")}
                    />
                    <button
                      type="submit"
                      className={cx(
                        "p-0 m-0 btn btn-dark position-absolute px-2"
                      )}
                    >
                      <AiOutlineSearch fontSize={20} color="#fff" />
                    </button>
                  </form>
                </div> */}
                <ul
                  className={cx(
                    "navbar-nav mt-0 mt-lg-0 mb-auto d-flex align-items-center"
                  )}
                >
                  <li className={cx("nav-item text-uppercase active")}>
                    <Link
                      className={cx(
                        "nav-link",
                        "d-block p-lg-3 pt-lg-0 pb-lg-0 text-decoration-none"
                      )}
                      to={"/"}
                    >
                      Home{" "}
                    </Link>
                  </li>
                  <li
                    className={cx(
                      "dropdown",
                      "box-shop",
                      "nav-item text-uppercase position-relative"
                    )}
                  >
                    <Link
                      className={cx(
                        "nav-link",
                        "d-flex align-items-center p-lg-3 pt-lg-0 pb-lg-0 text-decoration-none"
                      )}
                      to={"/shop"}
                    >
                      <span>Shop</span>
                      <FaChevronDown fontSize={12} className={cx("d-none d-lg-block")} />
                    </Link>
                    <div className={cx("menu-child","position-absolute py-2 d-none d-lg-block bg-white")}>
                      <div
                        className={cx("", "border-1 rounded-0 overflow-hidden")}
                      >
                        {categories.map((item, index) => (
                          <Link
                            key={index}
                            to={
                              "/shop?name=" + item.name + "&id=" + item.id
                            }
                            className={cx(
                              "text-decoration-none text-dark small py-2 px-3 d-block", "link-menu_child"
                            )}
                          >
                            <div className={cx("item")}>
                              <span>{item.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li className={cx("nav-item text-uppercase")}>
                    <Link
                      className={cx(
                        "nav-link",
                        "d-block p-lg-3 pt-lg-0 pb-lg-0 text-decoration-none"
                      )}
                      to={"/about"}
                    >
                      About{" "}
                    </Link>
                  </li>
                  <li className={cx("nav-item text-uppercase")}>
                    <Link
                      className={cx(
                        "nav-link",
                        "d-block p-lg-3 pt-lg-0 pb-lg-0 text-decoration-none"
                      )}
                      to={"/contact"}
                    >
                      Contact us{" "}
                    </Link>
                  </li>
                  <li className={cx("nav-item text-uppercase")}>
                    <Link
                      className={cx(
                        "nav-link",
                        "d-block p-lg-3 pt-lg-0 pb-lg-0 text-decoration-none"
                      )}
                      to={"/faqs"}
                    >
                      FAQs{" "}
                    </Link>
                  </li>
                </ul>
                <ul
                  className={cx(
                    "list-unstyled d-flex justify-content-between align-items-center m-0"
                  )}
                >
                  <li
                    className={cx(
                      "nav-item","mr-4 text-dark py-2"
                    )}
                    onClick={() => handleFormSearch(true)}
                  >
                    <div
                      id={cx("icon-search", "")}
                    >
                      <AiOutlineSearch fontSize={20} />
                    </div>
                  </li>
                  <li
                    className={cx(
                      "nav-item","mr-4 text-dark py-2 dropdown bg-white",
                      "dropdown",
                      "box-user"
                    )}
                  >
                    <div className={cx("py-2")}>
                      <FaRegUser fontSize={20} />
                    </div>
                    <div className={cx("menu-child", "position-absolute py-2")}>
                      <div className={cx("")}>
                        <div className={cx("item")}>
                          <Link
                            to={"/login"}
                            className={cx("text-dark text-decoration-none py-1 px-3 w-100 d-block", "link-menu_child")}
                          >
                            <div><span>Login</span></div>
                          </Link>
                        </div>
                        <div className={cx("item")}>
                          <Link
                            to={"/register"}
                            className={cx("text-dark text-decoration-none py-1 px-3 w-100 d-block", "link-menu_child")}
                          >
                            <div><span>Register</span></div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={cx("nav-item","mr-4 text-dark")}>
                    <Link
                      to={"/favourite"}
                      className={cx(
                        "position-relative text-dark py-2",
                        "link-tym"
                      )}
                    >
                      <small
                        className={cx(
                          "position-absolute text-light bg-danger rounded-circle text-center"
                        )}
                      >
                        {wishlist.length}
                      </small>
                      <AiOutlineHeart fontSize={20} />
                    </Link>
                  </li>
                  <li
                    className={cx(
                      "nav-item","mr-5 mr-4 text-dark py-2",
                      "shopping-cart"
                    )}
                  >
                    <div className={cx("position-relative ")}>
                      <small
                        className={cx(
                          "position-absolute text-light bg-danger rounded-circle text-center"
                        )}
                      >
                        {prdInCarts.length}
                      </small>
                      <AiOutlineShoppingCart fontSize={20} />
                    </div>
                    <div className={cx("position-absolute p-3")}>
                      {prdInCarts.length === 0 ? (
                        <div className={cx("text-uppercase text-center")}>
                          No products in cart!
                        </div>
                      ) : (
                        <>
                          <div className={cx("box-prds", "pb-4")}>
                            {prdInCarts.map((item, index) => (
                              <div
                                className={cx(
                                  "prd",
                                  "position-relative d-flex"
                                )}
                                key={index}
                              >
                                <Link
                                  className={cx("my-2 mr-3")}
                                  to={"/shop/detail/" + item.id}
                                >
                                  <img
                                    src={item.thumbnail}
                                    alt={item.thumbnail}
                                  />
                                </Link>
                                <div className={cx("")}>
                                  <Link
                                    className={cx(
                                      "name",
                                      "text-decoration-none"
                                    )}
                                    to={"/shop/detail/" + item.id}
                                  >
                                    <div className={cx("m-0 p-0")}>
                                      {item.name}
                                    </div>
                                  </Link>
                                  <span
                                    className={cx(
                                      "d-block text-dark",
                                      "quatity"
                                    )}
                                  >
                                    Qty: {item.quantity}
                                  </span>
                                  <span className={cx("small")}>
                                    <b>${item.price}</b>
                                  </span>
                                </div>
                                <span
                                  className={cx(
                                    "delete",
                                    "position-absolute border border-1 rounded-circle"
                                  )}
                                >
                                  <BsXLg
                                    fontSize={20}
                                    className={cx("icon-del")}
                                    onClick={() =>
                                      deletePrdInCart(item.id_cart)
                                    }
                                  />
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className={cx("")}>
                            <div
                              className={cx(
                                "py-2 d-flex justify-content-between align-items-center"
                              )}
                            >
                              <span className={cx("small d-block")}>
                                <b className={cx("")}>Total:</b>
                              </span>
                              <span>${totalPrice}</span>
                            </div>
                            <div
                              className={cx(
                                "d-flex justify-content-between"
                              )}
                            >
                              <Link
                                className={cx(
                                  "btnLink",
                                  "w-50 text-center p-2 text-uppercase text-decoration-none text-white position-relative mr-2"
                                )}
                                to={"/shop/cart"}
                              >
                                view cart
                              </Link>
                              <Link
                                className={cx(
                                  "btnLink",
                                  "w-50 text-center p-2 text-uppercase text-decoration-none text-white position-relative"
                                )}
                                to={"/shop/checkout"}
                              >
                                check out
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div id={cx("form-search")} className={cx("form-search_fixed position-fixed")}>
          <div
            className={cx(
              "container position-relative d-flex justify-content-center align-items-center w-100 h-100"
            )}
          >
            <div
              id={cx("icon-exit")}
              className={cx(
                "position-absolute d-flex justify-content-center align-items-center"
              )}
              onClick={() => handleFormSearch(false)}
            >
              <span
                className={cx(
                  "m-0 p-0 d-flex justify-content-center align-items-center"
                )}
              >
                <span className={cx("mb-2")}>&times;</span>
              </span>
            </div>
            <form action="/search" className={cx("w-100 position-relative p-0 m-0")}>
              <input
                type="text"
                name="q"
                placeholder="Search entire storage here..."
                className={cx("w-100 position-absolute")}
              />
              <button
                type="submit"
                className={cx(
                  "position-absolute p-0 m-0 d-flex align-items-center"
                )}
              >
                <AiOutlineSearch fontSize={30} />
                <span className={cx("ml-3")}>Search</span>
              </button>
            </form>
          </div>
        </div>
        <div
          id={cx("scrollTop")}
          className={cx("header_scrollTop position-fixed")}
          onClick={handleScrollTop}
        >
          <FaChevronUp fontSize={25} color="#fff" />
        </div>
        <div ref={header_toggle} className={cx("header-menu_toggle", "d-block d-lg-none position-fixed")}>
          <div className={cx("box-menu_toggle", "position-relative h-100 bg-white col-8 col-md-4 col-sm-5 py-3 d-flex flex-column justify-content-between")}>
            <ul className={cx("list-unstyled")}>
              <li className={cx("nav-item text-uppercase")}>
                <div>
                  <form action="/search" className={cx("d-flex")}>
                    <input type="text" name="q" placeholder="Search..." className={cx("form-control rounded-0")} />
                    <button type="submit" className={cx("btn btn-info rounded-0")}>
                      <AiOutlineSearch />
                    </button>
                  </form>
                </div>
              </li>
              <hr />
              <li className={cx("nav-item text-uppercase active")}>
                <Link
                  className={cx(
                    "nav-link",
                    "d-block py-2 text-decoration-none"
                  )}
                  to={"/"}
                >
                  Home{" "}
                </Link>
              </li>
              <li
                className={cx(
                  "box-shop",
                  "nav-item text-uppercase position-relative"
                )}
              >
                <Link
                  className={cx(
                    "nav-link",
                    "dropdown-toggle d-flex align-items-center justify-content-between py-2 text-decoration-none"
                  )}
                  ref={linkDropdownShop}
                  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                >
                  <span>Shop</span>
                  <FaChevronDown fontSize={12} className={cx("d-none d-lg-block")} />
                </Link>
                <div className={cx("dropdown-menu rounded-0")}>
                  <Link
                    to={
                      "/shop"
                    }
                    className={cx(
                      "dropdown-item text-decoration-none text-dark small py-2 px-3 d-block text-center bg-secondary", "link-menu_child"
                    )}
                  >
                    <div className={cx("item")}>
                      <b className={cx("text-white")}>ALL</b>
                    </div>
                  </Link>
                  {categories.map((item, index) => (
                    <Link
                      key={index}
                      to={
                        "/shop?name=" + item.name + "&id=" + item.id
                      }
                      className={cx(
                        "text-decoration-none text-dark small py-2 px-3 d-block bg-white", "link-menu_child", "dropdown-item"
                      )}
                    >
                      <div className={cx("item")}>
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </li>
              <li className={cx("nav-item text-uppercase")}>
                <Link
                  className={cx(
                    "nav-link",
                    "d-block py-2 text-decoration-none"
                  )}
                  to={"/about"}
                >
                  About{" "}
                </Link>
              </li>
              <li className={cx("nav-item text-uppercase")}>
                <Link
                  className={cx(
                    "nav-link",
                    "d-block py-2 text-decoration-none"
                  )}
                  to={"/contact"}
                >
                  Contact us{" "}
                </Link>
              </li>
              <li className={cx("nav-item text-uppercase")}>
                <Link
                  className={cx(
                    "nav-link",
                    "d-block py-2 text-decoration-none"
                  )}
                  to={"/faqs"}
                >
                  FAQs{" "}
                </Link>
              </li>
              <li className={cx("nav-item text-uppercase")}>
                <Link
                  className={cx(
                    "nav-link",
                    "d-block py-2 text-decoration-none"
                  )}
                  to={"/favourite"}
                >
                  Favourite{" "}
                </Link>
              </li>
            </ul>
            <ul className={cx("list-unstyled d-flex justify-content-between align-items-center")}>
              <li className={cx("nav-item text-uppercase col-6 text-center")}>
                  <Link
                    className={cx(
                      "nav-link",
                      "d-block py-2 text-decoration-none"
                    )}
                    to={"/login"}
                  >
                    Login{" "}
                  </Link>
                </li>
                <small className={cx("text-secondary")}>|</small>
                <li className={cx("nav-item text-uppercase col-6 text-center")}>
                  <Link
                    className={cx(
                      "nav-link",
                      "d-block py-2 text-decoration-none"
                    )}
                    to={"/register"}
                  >
                    Register{" "}
                  </Link>
                </li>
            </ul>
            <div className={cx("icon-exit", "position-absolute bg-danger p-2 btn rounded-0")}>
              <span className={cx("d-block")}>
                <BsXLg fontSize={25} color="#fff" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Header);
