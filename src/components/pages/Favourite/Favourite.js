import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './favourite.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineHome } from 'react-icons/ai';
import { MainData } from '../../layouts/MainComponent';
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from '../../../redux/reducers/carts';
import { CreateCart, DelProductInWishlist } from '../../../Services/AllSevice';
import { deletePrdInWishlist } from '../../../redux/reducers/wishlist';
import $ from 'jquery';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function Favourite() {
  const dispatch = useDispatch();
  const { products } = useContext(MainData);
  const _wishlists = useSelector((state) => state.wishlist);
  const _carts = useSelector((state) => state.carts);
  const [wishlist, setWishlist] = useState([]);
  const listIdInCarts = _carts.map(item=>item.id_product);
  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }, []);

  useEffect(() => {
    const run = async () => {           
      const result = [];
      await _wishlists.forEach(async (item, index) => {
        const prd = await products.find(a => a.id  === item.id_product);
        if(prd) {
          const obj = await {...prd, id_wishlist:item.id, status: item.status};
          result.push(obj);
          Object.preventExtensions(obj);
          if(_wishlists.length === index + 1) {
            setWishlist(result);
          }
        }
      });
    }
    run();
  }, [_wishlists, products]);

  const addToCart = (id_product) => {
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

  const deleteFavourite = (id, index) => {
    DelProductInWishlist(id, (result) => {
      const action = deletePrdInWishlist(id);
      dispatch(action);
    });
  }
  
  return (
    <main className={cx("favouriteComponent")}>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0")}>Wishlist</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <Link to={"/shop"} className={cx("text-dark")}>
            Shop
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>Wishlist</span>
        </div>
      </div>
      <div className={cx("box-main")}>
        <div className={cx("container w-100")}>
          <table border={1} cellPadding={5} cellSpacing={0} className={cx("w-100")} id={cx("tableWithlist")}>
            <thead>
              <tr className={cx("bg-danger text-light text-uppercase text-center")}>
                <th className={cx("py-3 col-1 d-none d-md-block border-0")}>Thumbnail</th>
                <th className={cx("py-3 col-3")}>Product</th>
                <th className={cx("py-3 col-2")}>Price</th>
                <th className={cx("py-3 col-3")}>Stock status</th>
                <th className={cx("py-3 col-3")}>Add to cart</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item, index) => (
                <tr key={index} className={cx("text-center text-dark")}>
                  <td className={cx("d-none d-md-block border-0")}>
                    <Link to={'/shop/detail/' + item.id} className={cx("border-0")}>
                      <img src={item.thumbnail} alt={item.thumbnail} className={cx("w-100 border-0")} />
                    </Link>
                  </td>
                  <td>
                    <Link to={'/shop/detail/' + item.id} className={cx("text-dark",)}><p className={cx("textStyle")}><b>{item.name}</b></p></Link>
                  </td>
                  <td>
                    <span>${item.price}</span>
                  </td>
                  <td>
                    <span className={cx("text-info")}><b>{item.status ? 'In Stock' : 'Out Stock'}</b></span>
                  </td>
                  <td className={cx("position-relative")}>
                    <div className={cx("w-100 d-flex justify-content-center align-items-center")}>
                      {listIdInCarts.includes(item.id) ? (
                        <Link to={'/shop/cart'} type="button" className={cx("btn btn-info")}>View cart</Link> )
                        : (
                          <button onClick={() => addToCart(item.id)} type="button" className={cx("btn btn-danger")}>Add to cart</button>
                        )
                      }
                      <button type='button' className={cx("position-absolute border-0 bg-transparent d-block", "btnDelete")} onClick={() => deleteFavourite(item.id_wishlist, index)}><span className={cx("d-block p-0 m-0")} >
                      <AiOutlineDelete fontSize={25} /></span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Favourite;