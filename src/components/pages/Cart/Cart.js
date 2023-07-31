import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './cart.module.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { MainData } from '../../layouts/MainComponent';
import { DelProductInCarts, UpdateCart } from '../../../Services/AllSevice';
import { deletePrdInCarts, updateCart } from '../../../redux/reducers/carts';
import $ from 'jquery';

const cx = classNames.bind(styles);

function Cart() {
  const dispatch = useDispatch();
  const { products } = useContext(MainData);
  const _carts = useSelector((state) => state.carts);
  const [carts, setCarts] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }, []);

  useEffect(() => {
    const run = async () => {
      const result = [];
      await _carts.forEach(async (item, index) => {
        const prd  = await products.find(a => a.id  === item.id_product);
        if(prd) {
          const obj = await {...prd, quantity:item.quantity, id_cart:item.id, totalPrice: prd.price * item.quantity};
          result.push(obj);
          Object.preventExtensions(obj);
          if(_carts.length === index + 1) {
            setCarts(result);
            setSubTotal(result.reduce((a, b) => a + b.totalPrice, 0));
          }
        }
      });
      if(!_carts.length) {
        setCarts(result);
        setSubTotal(result.reduce((a, b) => a + b.totalPrice, 0));
      }
    }
    run();
  }, [_carts, products]);

  const handleCount = (key, id) => {
    const demo = [...carts];
    if(key) {
      demo.find((item, index)=> {
        if(item.id === id) {
          if(demo[index].quantity > 1) {
            demo[index] = {...demo[index], quantity: demo[index].quantity - 1, totalPrice: (demo[index].quantity - 1) * demo[index].price};
            setCarts(demo);
          }
        }
        return item.id === id;
      });
    } else {
      demo.find((item, index)=> {
        if(item.id === id) {
          demo[index] = {...demo[index], quantity: demo[index].quantity + 1, totalPrice: (demo[index].quantity + 1) * demo[index].price};
          setCarts(demo);
        }
        return item.id === id;
      });
    }
  }

  const handleCart = (id, index) => {
    DelProductInCarts(id, (data) => {
      Swal.fire({
        title: 'Delete successful!',
        timer: 1000,
        showCancelButton: false,
        showConfirmButton: false,
        position: 'top-left',
        color: 'green',
        customClass: 'swal-height',
        heightAuto: false,
      });
      const action = deletePrdInCarts(id);
      dispatch(action);
      // const result = carts.filter(item => Number(item.id_cart) !== Number(id));
      // setCarts(result);
      // setSubTotal(result.reduce((a, b) => a + b.totalPrice, 0));
    });
  }

  const handleUpdateCart = () => {
    const result = carts.map(item=> ({
      id: item.id_cart,
      id_product: item.id,
      quantity: item.quantity
    }));
    result.forEach((item, index) => {
      UpdateCart(item.id, item, (data) => {
        if(data.length) { }
      });
      if(index === result.length -1) {
        Swal.fire({
          title: 'Update successful!',
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false,
          position: 'top-left',
          color: 'green',
          customClass: 'swal-height',
          heightAuto: false,
        });
        const action = updateCart(result);
        dispatch(action);
        setSubTotal(carts.reduce((a, b) => a + b.quantity* b.price, 0));
      }
    });
  }
  
  return (
    <main className={cx("cartComponent")}>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0")}>Cart</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <Link to={"/shop"} className={cx("text-dark")}>
            Shop
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>Cart</span>
        </div>
      </div>
      <div className={cx("container mt-5", "box-main")}>
        <div className={cx("w-100")}>
          <table border={1} cellPadding={5} cellSpacing={0} className={cx("p-0 m-0 w-100")}>
            <thead>
              <tr className={cx("bg-danger text-light text-center")}>
                <th className={cx("col-3 py-3")}>PRODUCT</th>
                <th className={cx("col-2 py-3")}>PRICE</th>
                <th className={cx("col-2 py-3")}>QUANTITY</th>
                <th className={cx("col-5 py-3")}>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => (
                <tr key={index}>
                  <td className={cx("")}>
                    <div className={cx("border-0 d-flex align-items-center p-0 m-0 py-2")}>
                      <span className={cx("col-4 px-lg-3 p-md-0 pl-md-2 d-none d-md-block border-0")}><img src={item.thumbnail} alt="demo-products" className={cx("w-100")} /></span>
                      <Link to={"/shop/detail/" + item.id} className={cx("col-8 text-dark")}>
                        <p className={cx("textStyle")}><b>{item.name}</b></p>
                      </Link>
                    </div>
                  </td>
                  <td className={cx("text-center text-dark")}>
                    <span>${item.price}</span>
                  </td>
                  <td className={cx("text-center text-dark")}>
                    <div className={cx("position-relative d-flex justify-content-center mx-lg-4 mx-2")}>
                      <button type='button' className={cx("border-0 bg-transparent")} onClick={() => handleCount(true, item.id)}>-</button>
                      <button type="button" className={cx("w-100 text-center bg-transparent")}>{item.quantity}</button>
                      <button type='button' className={cx("border-0 bg-transparent")} onClick={() => handleCount(false, item.id)}>+</button>
                    </div>
                  </td>
                  <td className={cx("text-center text-dark position-relative")}>
                    <div className={cx("")}>
                      <span>${item.quantity * item.price}</span>
                      <span className={cx("position-absolute")} onClick={() => handleCart(item.id_cart, index)}>
                        <BsXLg fontSize={16}/>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  <div className={cx("d-flex align-items-center")}>
                    <input type="text" name="" placeholder='Enter Your Coupon Code' className={cx(" form-control w-75 rounded-0")} />
                    <button type="button" className={cx("btn btn-danger d-block w-25 rounded-0")}>Apply Coupon</button>
                  </div>
                </td>
                <td className={cx("d-flex justify-content-end border-0")}>
                  <button type="buttotn" className={cx("btn btn-danger ml-auto rounded-0")} onClick={handleUpdateCart}>Update Cart</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cx("mt-4 d-flex")}>
          <div className={cx("bg-light p-3 w-50")}>
            <h5><b>Cart Totals</b></h5>
            <ul className={cx("list-unstyled")}>
              <li className={cx("d-flex justify-content-between align-items-center py-3 text-dark")}>
                <span><b>Sub Total</b></span>
                <span><b>${subTotal}</b></span>
              </li>
              <li className={cx("d-flex justify-content-between align-items-center py-3 text-dark")}>
                <span><b>Shipping</b></span>
                <span><b>${shipping}</b></span>
              </li>
              <li className={cx("d-flex justify-content-between align-items-center py-3 text-dark")}>
                <span><b>Total</b></span>
                <span><b>${subTotal + shipping}</b></span>
              </li>
            </ul>
            <Link to={'/shop/checkout'} type="button" className={cx("btn btn-danger rounded-0")}>Proceed To Checkout</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;