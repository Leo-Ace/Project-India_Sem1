import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./search.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { MainData } from "../../layouts/MainComponent";
import {
  CreateCart,
  CreateWishlist,
  DelProductInWishlist,
  ProductsById,
} from "../../../Services/AllSevice";
import Swal from "sweetalert2";
import {
  deletePrdInWishlist,
  updateWishlist,
} from "../../../redux/reducers/wishlist";
import { createCart } from "../../../redux/reducers/carts";
import {
  BsCartPlus,
  BsCheckLg,
  BsFillHeartFill,
  BsHeart,
  BsSearch,
  BsStarFill,
} from "react-icons/bs";

const cx = classNames.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const _carts = useSelector((state) => state.carts);
  const _wishlists = useSelector((state) => state.wishlist);
  const listIdInCart = _carts.map((item) => item.id);
  const listIdInWishlist = _wishlists.map((item) => item.id);
  const { products } = useContext(MainData);
  const [result, setResult] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    // get data from api
    const r = products.filter(item => item.name.toUpperCase().indexOf(searchParams.get('q').toUpperCase()) !== -1);
    setResult(r);
  }, [products, searchParams]);

  const handleCart = (id_product) => {
    const idMax = Number(Math.max(...listIdInCart, 0));
    ProductsById(id_product, (data) => {
      const newData = {
        id: idMax + 1,
        id_product: id_product,
        quantity: 1,
      };
      CreateCart(newData, (result) => {
        Swal.fire({
          title: "Added to cart!",
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false,
          position: "top-left",
          color: "green",
          customClass: "swal-height",
          heightAuto: false,
        });
        const action = createCart({
          ...data,
          quantity: newData.quantity,
          id_cart: newData.id,
          totalPrice: data.price * newData.quantity,
        });
        dispatch(action);
      });
    });
  };

  const handleWishlist = (id_product, check) => {
    if (check) {
      _wishlists.forEach((item, index) => {
        if (item.id === id_product) {
          DelProductInWishlist(item.id_wishlist, (data) => {
            const action = deletePrdInWishlist(index);
            dispatch(action);
          });
        }
      });
    } else if (!check) {
      const idMax = Number(Math.max(...listIdInWishlist, 0));
      const prd = products.find((item) => item.id === id_product);
      const newData = {
        id: idMax + 1,
        id_product: id_product,
        state: 0,
      };
      CreateWishlist(newData, (result) => {
        Swal.fire({
          title: "Loved!",
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false,
          position: "top-left",
          color: "green",
          customClass: "swal-height",
          heightAuto: false,
        });
        const action = updateWishlist({
          ...prd,
          id_wishlist: idMax + 1,
          state: 0,
        });
        dispatch(action);
      });
    }
  };

  return (
    <main className={cx("searchComponent")}>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0")}>ALL RESULT OF: {searchParams.get('q')}</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>Search</span>
        </div>
      </div>
      <div className={cx("container mt-5", "box-main", "box-products")}>
        <div className={cx("box-items")}>
          <div className={cx("row")}>
            {result[0] ? result.map((item, index) => (
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
                    className={cx("card-body", "p-0 m-0 d-flex flex-column")}
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
                      {listIdInCart.includes(item.id) ? (
                        <li className={cx("mb-2")}>
                          <Link to={"/shop/cart"}>
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
                        <BsSearch fontSize={18} color="" className={cx("")} />
                      </li>
                      {listIdInWishlist.includes(item.id) ? (
                        <li
                          className={cx("mb-2")}
                          onClick={() => handleWishlist(item.id, true)}
                        >
                          <BsFillHeartFill
                            fontSize={18}
                            color="red"
                            className={cx("item-icon")}
                          />
                        </li>
                      ) : (
                        <li
                          className={cx("mb-2")}
                          onClick={() => handleWishlist(item.id, false)}
                        >
                          <BsHeart fontSize={18} color="" className={cx("")} />
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
                      <span className={cx("text-light bg-warning")}>Hot</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            )) : (<h1 className={cx("text-secondary")}>There is no result!</h1>)}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Search;
