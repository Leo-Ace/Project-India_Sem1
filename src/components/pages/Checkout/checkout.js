/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./checkout.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import $ from 'jquery';
import { MainData } from "../../layouts/MainComponent";

const cx = classNames.bind(styles);

function checkout() {
  const _carts = useSelector((state) => state.carts);
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const { products, categories } = useContext(MainData);

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
            setTotal(result.reduce((a, b) => a + Number(b.price) * Number(b.quantity), 0));
            setCarts(result);
          }
        }
      });
    }
    run();
  }, [_carts, products]);
  
  return (
    <>
    <main>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0")}>Checkout</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <Link to={"/shop"} className={cx("text-dark")}>
            Shop
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>Checkout</span>
        </div>
      </div>
      <div className="container-fluid mt-5">
        <div className={cx("row")}>
          <div className="col-lg-6 p-3">
            <form action="" className={cx("w-100 shadow-none")}>
                <h3>BILLING DETAILS</h3>
                <div className="form-row d-flex justify-content-between">
                  <div className="form-group mt-3 col-lg-6">
                    <label htmlFor="firstname"> <b>First Name</b> </label>
                    <input type="text" className="form-control rounded-0" id="firstname" />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="form-group mt-3 col-lg-6">
                    <label htmlFor="lastname"> <b>Last Name</b> </label>
                    <input type="text" className="form-control rounded-0" id="lastname" />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor=""> <b>Company name (optional)</b> </label>
                  <input type="text" className="form-control rounded-0" id="email" required />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="adress"><b>Stress address</b> </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="adress"
                    placeholder="House number and stress name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mt-3 col-lg-4">
                    <label htmlFor="country"> <b>Country</b> </label>
                    <select type="text" className="form-control rounded-0" id="country">
                      <option className={cx("text-secondary")} disabled>Choose...</option>
                      <option> United Kingdom </option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="form-group mt-3 col-lg-4">
                    <label htmlFor="city"> <b>City</b> </label>
                    <select type="text" className="form-control rounded-0" id="city">
                      <option disabled className={cx("text-secondary")}>Choose... </option>
                      <option> London </option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>
                  <div className="form-group mt-3 col-lg-4">
                    <label htmlFor="postcode"> <b>Postcode</b> </label>
                    <select type="text" className="form-control rounded-0" id="postcode">
                      <option disabled className={cx("text-secondary")}>Choose... </option>
                      <option> NW6 2LS </option>
                    </select>
                    <div className="invalid-feedback">Postcode required.</div>
                  </div>
                </div>
            </form>
          </div>
          <div className="col-lg-6 p-3">
            <h3>YOUR ORDER</h3>
            <table border={1} cellPadding={5} cellSpacing={0} className="table border">
              <thead>
                <tr>
                  <th className={cx("col-9")}>Product</th>
                  <th className={cx("col-3")}>Total</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item, index) => (
                  <tr key={index}>
                    <td><p className={cx("textStyle", "p-0 m-0")}>{item.name}</p></td>
                    <td>${item.price * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Shipping</th>
                  <td>0</td>
                </tr>
                <tr>
                  <th scope="row">Total</th>
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-muted bg-info text-white p-2">
              <div className="form-check ml-2 mt-3">
                <input
                  type="radio"
                  className="form-check-input"
                  id="credit"
                  name="payment-method"
                  defaultChecked
                  required
                />
                <label htmlFor="credit" className="form-check-label">
                  Chayque Payment
                </label>
                <div className={cx("bg-info ml-5", "triangle")}></div>
                <div className="mr-4 p-3 bg-light text-dark">
                  Please send your cheque to Store Name,Store Stree Store Town
                  Srore State / County. Store Postcode
                </div>
              </div>
              <div className="form-check ml-2 mt-3">
                <input
                  type="radio"
                  className="form-check-input"
                  id="paypal"
                  name="payment-method"
                  required
                />
                <label htmlFor="paypal" className="form-check-label">
                  PayPal
                </label>
                <img
                  className="w-25 ml-3"
                  src="/images/Full_Bank.png"
                  alt=""
                />
              </div>
            </div>
            <button
              className="btn btn-primary bt-lg btn-block mt-5 rounded-0"
              type="submit"
            >
              <b>Continue to Checkout</b>
            </button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

export default checkout;
