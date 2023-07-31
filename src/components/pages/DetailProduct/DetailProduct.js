import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./detailproduct.module.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useHref, useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BsFillEyeFill, BsStarFill } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import $ from "jquery";
import {
  CreateCart,
  CreateWishlist,
  DelProductInWishlist,
  GetBrandById,
  GetCateByKey,
  ProductsById,
} from "../../../Services/AllSevice";
import { useDispatch, useSelector } from "react-redux";
import { createCart, updateCart } from "../../../redux/reducers/carts";
import { deletePrdInWishlist, updateWishlist } from "../../../redux/reducers/wishlist";
import Swal from "sweetalert2";
import { MainData } from "../../layouts/MainComponent";

const cx = classNames.bind(styles);

function DetailProduct() {
  window.fn = OwlCarousel;

  const options = {
    loop: true,
    autoplay: true,
    dots: false,
    items: 1,
    navs: "true",
  };
  const {products}= useContext(MainData);
  const [product, setProduct] = useState({});
  const [brand, setBrand] = useState({});
  const [category, setCategory] = useState({});
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const _carts = useSelector((state) => state.carts);
  const _wishlists = useSelector((state) => state.wishlist);
  const listIdPrdInCarts = _carts.map((item) => item.id_product);
  const listIdPrdInWishlist = _wishlists.map((item) => item.id_product);
  const elemCount = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    ProductsById(id, (data) => {
      setProduct(data);
      GetBrandById(data.id_brand, (data) => setBrand(data));
      GetCateByKey({ type: "id", value: data.id_cate }, (data) =>
        setCategory(data[0])
      );
    });
  }, [id]);

  const handleCart = () => {
    const idMax = Number(Math.max(..._carts.map(item=>item.id), 0));
    const newData = {
      id: idMax + 1,
      id_product: Number(id),
      quantity: Number(elemCount.current.value),
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
    <main className={cx("detailComponent")}>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0 text-uppercase")}>product details</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <Link to={"/shop"} className={cx("text-dark")}>
            Shop
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>Detail/{id}</span>
        </div>
      </div>
      <div className={cx("box-main", "container mt-5")}>
        <div className={cx("row pb-5 d-flex align-items-center")}>
          <div className={cx("col-lg-7 d-block")}>
            <OwlCarousel
              className={cx(
                "owl-theme",
                "position-relative overflow-hidden d-block"
              )}
              {...options}
            >
              <div className="item">
                <img src={product.thumbnail} alt={product.thumbnail} />
              </div>
            </OwlCarousel>
          </div>
          <div className={cx("col-lg-5 mt-lg-0 mt-4")}>
            <div className={cx("headers")}>
              <h2 className={cx("product_title", "p-0 m-0")}>
                <b className={cx("p-0 m-0")}>{product.name}</b>
              </h2>
              <div className={cx("d-flex align-items-center mb-2")}>
                <ul className={cx("list-unstyled d-flex m-0")}>
                  {[1, 2, 3, 4, 5].map((elem, index) => {
                    if (product.evaluate >= index) {
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
                <p className={cx("p-0 m-0 small ml-2")}>
                  <span>1</span> Reviews
                </p>
              </div>
              <div className={cx("price")}>
                <h3 className={cx("text-danger py-2")}>
                  <b>${product.price}</b>
                </h3>
              </div>
            </div>
            <div className={cx("description")}>
              <p className={cx("text-secondary py-3")}>{product.description}</p>
            </div>
            <div className={cx("btn-group", "d-flex")}>
              {!listIdPrdInCarts.includes(product.id) ? (
                <>
                  <div
                    className={cx(
                      "quantity",
                      "col-4 d-flex justify-content-between align-items-center border border-1 p-0 m-0"
                    )}
                  >
                    <button
                      type="button"
                      className={cx(
                        "plus",
                        "bg-transparent p-2 px-3 text-secondary"
                      )}
                      onClick={() => setCount((prev) => prev + 1)}
                    >
                      <b>+</b>
                    </button>
                    <input
                      type="text"
                      name=""
                      readOnly
                      id=""
                      value={count}
                      min={1}
                      className={cx(
                        "elem_count",
                        "w-100 text-center text-secondary"
                      )}
                      ref={elemCount}
                    />
                    <button
                      type="button"
                      className={cx(
                        "minus",
                        "bg-transparent p-2 px-3 text-secondary"
                      )}
                      onClick={() => setCount((prev) => prev - 1 || 1)}
                    >
                      <b>-</b>
                    </button>
                  </div>
                  <div className={cx("col-8")}>
                    <button
                      type="button"
                      className={cx(
                        "text-uppercase w-100 p-2 text-light position-relative"
                      )}
                      onClick={handleCart}
                    >
                      <b>Add to cart</b>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div></div>
                  <div className={cx("col-12")}>
                    <Link
                      to={"/shop/cart"}
                      className={cx("text-decoration-none")}
                    >
                      <button
                        type="button"
                        className={cx(
                          "text-uppercase w-100 p-2 text-light position-relative d-flex align-items-center justify-content-center text-decoration-none"
                        )}
                      >
                        <b>already in cart</b>
                        <BsFillEyeFill className={cx("ml-2")} />
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className={cx("mt-4 d-flex", "group-color")}>
              <h5 className={cx("m-0 p-0 mb-2")}>
                <b>Color:</b>
              </h5>
              <div className={cx("mt-1 ml-3")}>
                <ul className={cx("list-unstyled d-flex flex-wrap")}>
                  <li className={cx("text-secondary mr-4")}>
                    <input
                      type="checkbox"
                      name=""
                      id="color"
                      className={cx("mr-2")}
                      defaultChecked
                    />
                    <label htmlFor="color">{product.color}</label>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx("pb-4", "wishlist")}>
              {listIdPrdInWishlist.includes(product.id) ? (
                <div className={cx("d-flex align-items-center", "active")} onClick={() => handleWishlist(product.id, true)}>
                  <span className={cx("p-3 border border-1 mr-3")}>
                    <AiOutlineHeart fontSize={25} />
                  </span>
                  <h5>
                    <b>Favourite</b>
                  </h5>
                </div>
              ) : (
                <div className={cx("d-flex align-items-center")} onClick={() => handleWishlist(product.id, false)}>
                  <span className={cx("p-3 border border-1 mr-3")}>
                    <AiOutlineHeart fontSize={25} />
                  </span>
                  <h5>
                    <b>Add to Wishlist</b>
                  </h5>
                </div>
              )}
            </div>
            <div className={cx("mt-3")}>
              <ul className={cx("list-unstyled ")}>
                <li className={cx("d-flex mb-2")}>
                  <span className={cx("text-secondary mr-2")}>Category:</span>
                  <p className={cx("p-0 m-0")}>{category.name}</p>
                </li>
                <li className={cx("d-flex mb-2")}>
                  <span className={cx("text-secondary mr-2")}>Brand:</span>
                  <p className={cx("p-0 m-0")}>{brand.name}</p>
                </li>
                <li className={cx("d-flex mb-2")}>
                  <span className={cx("text-secondary mr-2")}>
                    <b>Share:</b>
                  </span>
                  <p className={cx("p-0 m-0")}>
                    <Link className={cx("mr-2 text-dark")}>
                      <FaFacebookF fontSize={13} />
                    </Link>
                    <Link className={cx("mr-2 text-dark")}>
                      <FaTwitter fontSize={13} />
                    </Link>
                    <Link className={cx("mr-2 text-dark")}>
                      <FaLinkedinIn fontSize={13} />
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("mt-4")}>
          <ul
            className={cx(
              "nav",
              "nav-pills",
              "d-flex justify-content-center mb-3"
            )}
            id="pills-tab"
            role="tablist"
          >
            <li className={cx("nav-item")} role="presentation">
              <button
                className={cx("nav-link", "position-relative active")}
                id="pills-home-tab"
                data-toggle="pill"
                data-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <b>Description</b>
              </button>
            </li>
            <li className={cx("nav-item")} role="presentation">
              <button
                className={cx("nav-link", "position-relative")}
                id="pills-profile-tab"
                data-toggle="pill"
                data-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <b>Reviews (1)</b>
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <p className={cx("text-secondary")}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className={cx("p-3 border border-1")}>
                <h3>
                  <b>1 review for</b>{" "}
                  <b className={cx("text-danger")}>{product.name}</b>
                </h3>
                <div className={cx("")}>
                  <div className={cx("d-flex mb-4")}>
                    <span className={cx("col-2")}>
                      <img
                        src="../../images/user.png"
                        alt="user"
                        className={cx("w-100")}
                      />
                    </span>
                    <div className={cx("col-10")}>
                      <div>
                        <ul className={cx("list-unstyled d-flex m-0")}>
                          <li className={cx("mr-1 d-flex")}>
                            <BsStarFill color="#ffba00" fontSize={14} />
                          </li>
                          <li className={cx("mr-1 d-flex")}>
                            <BsStarFill color="#ffba00" fontSize={14} />
                          </li>
                          <li className={cx("mr-1 d-flex")}>
                            <BsStarFill color="#ffba00" fontSize={14} />
                          </li>
                          <li className={cx("mr-1 d-flex")}>
                            <BsStarFill color="#ffba00" fontSize={14} />
                          </li>
                          <li className={cx("mr-1 d-flex")}>
                            <BsStarFill color="#ffba00" fontSize={14} />
                          </li>
                        </ul>
                      </div>
                      <div className={cx("")}>
                        <p>
                          <span>Admin</span> - <span>6/22/2023</span>
                        </p>
                      </div>
                      <div className={cx("text-secondary")}>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam fringilla augue nec est tristique auctor.
                          Ipsum metus feugiat sem, quis fermentum turpis eros
                          eget velit. Donec ac tempus ante. Fusce ultricies
                          massa massa.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={cx("mt-5")}>
                    <form
                      action=""
                      method=""
                      className={cx("w-100 border border-1 p-2", "form-cmt")}
                    >
                      <div className={cx("form-group d-flex flex-column")}>
                        <label htmlFor="yourname" className={cx("text-dark")}>
                          <span className={cx("text-danger")}>*</span>Your Name
                        </label>
                        <input
                          type="text"
                          name="yourname"
                          className={cx("form-control")}
                        />
                      </div>
                      <div className={cx("form-group d-flex flex-column")}>
                        <label htmlFor="youremail" className={cx("text-dark")}>
                          <span className={cx("text-danger")}>*</span>Your Email
                        </label>
                        <input
                          type="text"
                          name="youremail"
                          className={cx("form-control")}
                        />
                      </div>
                      <div className={cx("form-group d-flex flex-column")}>
                        <label htmlFor="yourname" className={cx("text-dark")}>
                          <span className={cx("text-danger")}>*</span>Your
                          Review
                        </label>
                        <textarea
                          rows="3
                        "
                          cols=""
                          className={cx("form-control")}
                        ></textarea>
                      </div>
                      <div className={cx("form-group d-flex")}>
                        <label htmlFor="yourname" className={cx("text-dark")}>
                          <span className={cx("text-danger")}>*</span>Rating:
                        </label>
                        <div className={cx("ml-2")}>
                          <span className={cx("px-2")}>Bad</span>
                          <input
                            type="radio"
                            name="rating"
                            className={cx("mx-1")}
                          />
                          <input
                            type="radio"
                            name="rating"
                            className={cx("mx-1")}
                          />
                          <input
                            type="radio"
                            name="rating"
                            className={cx("mx-1")}
                          />
                          <input
                            type="radio"
                            name="rating"
                            className={cx("mx-1")}
                          />
                          <input
                            type="radio"
                            name="rating"
                            className={cx("mx-1")}
                          />
                          <span className={cx("px-2")}>Good</span>
                        </div>
                      </div>
                      <button type="button">Continue</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailProduct;
