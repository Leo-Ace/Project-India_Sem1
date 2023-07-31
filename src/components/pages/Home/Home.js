import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./home.module.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import $ from 'jquery';
import {
  BsCartPlus,
  BsCheckLg,
  BsFillHeartFill,
  BsHeart,
  BsSearch,
  BsStarFill,
} from "react-icons/bs";
import {
  CreateCart,
  CreateWishlist,
  DelProductInWishlist,
  ProductsById,
} from "../../../Services/AllSevice";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../../../redux/reducers/carts";
import { deletePrdInWishlist, updateWishlist } from "../../../redux/reducers/wishlist";
import { MainData } from "../../layouts/MainComponent";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();
  const _carts = useSelector((state) => state.carts);
  const _wishlists = useSelector((state) => state.wishlist);
  const {brand, products}= useContext(MainData);
  const [popularPrd, setPopularPrd] = useState([]);
  const [favouritePrd, setFavouritePrd] = useState([]);
  const listIdPrdInCart = _carts.map((item) => item.id_product);
  const listIdPrdInWishlist = _wishlists.map((item) => item.id_product);
  window.fn = OwlCarousel;

  const options = {
    center: true,
    loop: true,
    autoplay: true,
    dotsClass: "false",
    margin: 10,
    responsive: {
      0: {
        items: 1,
        center: false,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    // get data from api
    const popularProducts = products.filter(
      (item, index) => item.consumption >= 0.7
    );
    const favouriteProducts = products.filter(
      (item, index) => item.evaluate >= 4
    );
    setPopularPrd(popularProducts);
    setFavouritePrd(favouriteProducts);
  }, [products]);

  const handleCart = (id_product) => {
    const idMax = Number(Math.max(..._carts.map(item=>item.id), 0));
    const newData = {
      id: idMax + 1,
      id_product: id_product,
      quantity: 1,
    };
    CreateCart(newData, (result) => {
      Swal.fire({
        title: 'Added to cart!',
        timer: 1000,
        showCancelButton: false,
        showConfirmButton: false,
        position: 'top-left',
        color: 'green',
        customClass: 'swal-height',
        heightAuto: false,
      });
      const action = createCart(newData);
      dispatch(action);
    });
  };

  const handleWishlist = (id_product, check) => {
    if (check) {
      _wishlists.forEach((item, index) => {
        if (item.id_product === id_product) {
          DelProductInWishlist(item.id, (data) => {
            const action = deletePrdInWishlist(item.id);
            dispatch(action);
          });
        }
      });
    } else if (!check) {
      const idMax = Number(Math.max(..._wishlists.map(item=>item.id), 0));
      const newData = {
        id: idMax + 1,
        id_product: id_product,
        state: 0,
      };
      CreateWishlist(newData, (result) => {
        Swal.fire({
          title: 'Loved!',
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false,
          position: 'top-left',
          color: 'green',
          customClass: 'swal-height',
          heightAuto: false,
        });
        const action = updateWishlist(newData);
        dispatch(action);
      });
    }
  };

  return (
    <>
      <main className={cx("homeComponent")}>
        <div className={cx("d-none d-lg-block")}>
          {/* Box Banner */}
          <OwlCarousel
            className={cx("owl-theme", "position-relative overflow-hidden")}
            loop
            items={1}
            autoplay
            nav
          >
            <div className="item">
              <img src="../images/home1-slide1.jpg" alt="home1-slide1" />
            </div>
            <div className="item">
              <img src="../images/home1-slide2.jpg" alt="home1-slide2" />
            </div>
            <div className="item">
              <img src="../images/home1-slide3.jpg" alt="home1-slide3" />
            </div>
          </OwlCarousel>
        </div>
        <div className={cx("box-main", "container mb-5 pb-5")}>
          {/* Box Sevices */}
          <div className={cx("boxsevice", "row my-5 text-center")}>
            <div className={cx("col-md-3 col-sm-6 mt-4")}>
              <div className="service-item">
                <div className={cx("icons", "pb-4")}>
                  <img src="../images/free_shipping.webp" alt="" />
                </div>
                <b className={cx("m-0 p-0 d-block")}>Free shipping</b>
                <small>Free shipping all order</small>
              </div>
            </div>
            <div className={cx("col-md-3 col-sm-6 mt-4")}>
              <div className="service-item">
                <div className={cx("icons", "pb-4")}>
                  <img src="../images/money_back.webp" alt="" />
                </div>
                <b className={cx("m-0 p-0 d-block")}>Money Return</b>
                <small>30 days for free return</small>
              </div>
            </div>
            <div className={cx("col-md-3 col-sm-6 mt-4")}>
              <div className="service-item">
                <div className={cx("icons", "pb-4")}>
                  <img src="../images/support247.webp" alt="" />
                </div>
                <b className={cx("m-0 p-0 d-block")}>Online Support</b>
                <small>Support 24 hours a day</small>
              </div>
            </div>
            <div className={cx("col-md-3 col-sm-6 mt-4 border-0")}>
              <div className="service-item">
                <div className={cx("icons", "pb-4")}>
                  <img src="../images/promotions.webp" alt="" />
                </div>
                <b className={cx("m-0 p-0 d-block")}>Deals &amp; Promotions</b>
                <small>Price savings, discounts</small>
              </div>
            </div>
          </div>
          {/* Box popular products */}
          <div className={cx("box-products_one", "box-products")}>
            <div className={cx("mx-auto text-center mt-5 py-4")}>
              <h5 className={cx("text-uppercase")}>
                <b>POPULAR</b> <b>PRODUCTS</b>
              </h5>
            </div>
            <div className={cx("box-items")}>
              <div className={cx("row")}>
                {popularPrd.map((item, index) => (
                  <div
                    className={cx("item", "col-lg-3 col-md-4 col-sm-6 mt-4")}
                    key={index}
                  >
                    <div className="card border-0 position-relative">
                      <Link to={"/shop/detail/" + item.id}>
                        <img
                          className="card-img-top"
                          src={item.thumbnail}
                          alt={item.thumbnail}
                        />
                      </Link>
                      <div
                        className={cx(
                          "card-body",
                          "p-0 m-0 d-flex flex-column"
                        )}
                      >
                        <ul className={cx("list-unstyled d-flex m-0 pt-2")}>
                          {[1, 2, 3, 4, 5].map((elem, index) => {
                            if (item.evaluate >= index) {
                              return (
                                <li className={cx("mr-1")} key={elem}>
                                  <BsStarFill color="#ffba00" fontSize={14} />
                                </li>
                              );
                            } else
                              return (
                                <li className={cx("mr-1")} key={elem}>
                                  <BsStarFill color="grey" fontSize={14} />
                                </li>
                              );
                          })}
                        </ul>
                        <Link
                          className={cx(
                            "title",
                            "text-decoration-none text-secondary pt-1"
                          )}
                          to={"/shop/detail/" + item.id}
                        >
                          <div className={cx("name-product")}>{item.name}</div>
                        </Link>
                        <span className={cx("pt-1")}>
                          <b>${item.price}</b>
                        </span>
                      </div>
                      <div className={cx("box-act", "position-absolute p-2")}>
                        <ul className={cx("list-unstyled")}>
                          {listIdPrdInCart.includes(item.id) ? (
                            <li
                              className={cx("mb-2")}
                            >
                              <Link to={'/shop/cart'}>
                                <BsCheckLg
                                  fontSize={18}
                                  color="green"
                                  className={cx("item-icon")}
                                />
                              </Link>
                            </li>
                          ) : (
                            <li
                              className={cx("mb-2")}
                              onClick={() => handleCart(item.id)}
                            >
                              <BsCartPlus
                                fontSize={18}
                                color=""
                                className={cx("")}
                              />
                            </li>
                          )}
                          <li className={cx("mb-2")}>
                            <BsSearch
                              fontSize={18}
                              color=""
                              className={cx("")}
                            />
                          </li>
                          {listIdPrdInWishlist.includes(item.id) ? (
                            <li className={cx("mb-2")} onClick={() => handleWishlist(item.id, true)}>
                              <BsFillHeartFill
                                fontSize={18}
                                color="red"
                                className={cx("item-icon")}
                              />
                            </li>
                          ) : (
                            <li className={cx("mb-2")} onClick={() => handleWishlist(item.id, false)}>
                              <BsHeart
                                fontSize={18}
                                color=""
                                className={cx("")}
                              />
                            </li>
                          )}
                        </ul>
                      </div>
                      <div
                        className={cx(
                          "hot_sale",
                          "position-absolute p-2 d-flex justify-content-between w-100"
                        )}
                      >
                        <span className={cx("text-light bg-danger")}>
                          -{item.discount}%
                        </span>
                        {item.consumption >= 0.8 ? (
                          <span className={cx("text-light bg-warning")}>
                            Hot
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Box favourite products */}
          <div className={cx("box-products_two", "box-products", "mt-5")}>
            <div className={cx("mx-auto text-center mt-5 py-4")}>
              <h5 className={cx("text-uppercase")}>
                <b>Favorite</b> <b>PRODUCTS</b>
              </h5>
            </div>
            <div className={cx("box-items")}>
              <div className={cx("row")}>
              {favouritePrd.map((item, index) => (
                  <div
                    className={cx("item", "col-lg-3 col-md-4 col-sm-6 mt-4")}
                    key={index}
                  >
                    <div className="card border-0 position-relative">
                      <Link to={"/shop/detail/" + item.id}>
                        <img
                          className="card-img-top"
                          src={item.thumbnail}
                          alt={item.thumbnail}
                        />
                      </Link>
                      <div
                        className={cx(
                          "card-body",
                          "p-0 m-0 d-flex flex-column"
                        )}
                      >
                        <ul className={cx("list-unstyled d-flex m-0 pt-2")}>
                          {[1, 2, 3, 4, 5].map((elem, index) => {
                            if (item.evaluate >= index) {
                              return (
                                <li className={cx("mr-1")} key={elem}>
                                  <BsStarFill color="#ffba00" fontSize={14} />
                                </li>
                              );
                            } else
                              return (
                                <li className={cx("mr-1")} key={elem}>
                                  <BsStarFill color="grey" fontSize={14} />
                                </li>
                              );
                          })}
                        </ul>
                        <Link
                          className={cx(
                            "title",
                            "text-decoration-none text-secondary pt-1"
                          )}
                          to={"/shop/detail/" + item.id}
                        >
                          <div className={cx("name-product")}>{item.name}</div>
                        </Link>
                        <span className={cx("pt-1")}>
                          <b>${item.price}</b>
                        </span>
                      </div>
                      <div className={cx("box-act", "position-absolute p-2")}>
                        <ul className={cx("list-unstyled")}>
                          {listIdPrdInCart.includes(item.id) ? (
                            <li
                              className={cx("mb-2")}
                              onClick={() => handleCart(item.id, true)}
                            >
                              <BsCheckLg
                                fontSize={18}
                                color="green"
                                className={cx("item-icon")}
                              />
                            </li>
                          ) : (
                            <li
                              className={cx("mb-2")}
                              onClick={() => handleCart(item.id, false)}
                            >
                              <BsCartPlus
                                fontSize={18}
                                color=""
                                className={cx("")}
                              />
                            </li>
                          )}
                          <li className={cx("mb-2")}>
                            <BsSearch
                              fontSize={18}
                              color=""
                              className={cx("")}
                            />
                          </li>
                          {listIdPrdInWishlist.includes(item.id) ? (
                            <li className={cx("mb-2")} onClick={() => handleWishlist(item.id, true)}>
                              <BsFillHeartFill
                                fontSize={18}
                                color="red"
                                className={cx("item-icon")}
                              />
                            </li>
                          ) : (
                            <li className={cx("mb-2")} onClick={() => handleWishlist(item.id, false)}>
                              <BsHeart
                                fontSize={18}
                                color=""
                                className={cx("")}
                              />
                            </li>
                          )}
                        </ul>
                      </div>
                      <div
                        className={cx(
                          "hot_sale",
                          "position-absolute p-2 d-flex justify-content-between w-100"
                        )}
                      >
                        <span className={cx("text-light bg-danger")}>
                          -{item.discount}%
                        </span>
                        {item.consumption >= 0.8 ? (
                          <span className={cx("text-light bg-warning")}>
                            Hot
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Box brands */}
        <div className={cx("box-brands", "my-5 px-5 position-relative")}>
          <div className={cx("mx-auto text-center mt-5 py-4")}>
            <h5 className={cx("text-uppercase")}>
              <b>brands</b>
            </h5>
          </div>
          <OwlCarousel
            className={cx("owl-theme", "position-relative py-4")}
            {...options}
          >
            {brand.map((item, index) => (
              <div className={cx("item", "p-0 overflow-hidden")} key={index}>
                <Link
                  className={cx("d-block p-4 position-relative overflow-hidden")}
                >
                  <div className={cx("after", "position-absolute")}></div>
                  <div className={cx("view", "position-absolute")}>
                    <BsSearch />
                    View
                  </div>
                  <img src={item.thumbnail} alt={item.thumbnail} />
                </Link>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </main>
    </>
  );
}

export default Home;
