import React from 'react';
import classNames from 'classnames/bind';
import styles from './form.module.css';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
  const href = window.location.href;
  console.log(href)
  return (
    <div>
      <>
      {href.indexOf('login') !== -1 ? 
        <main className={cx("mb-5")}>
          <div className={cx("w-100 bg-light p-5 text-center")}>
            <p className={cx("p-0 m-0")}>Login</p>
            <div className={cx("d-flex align-items-center justify-content-center")}>
              <Link to={'/'} className={cx("text-dark")} ><AiOutlineHome /></Link>
              <span className={cx("mx-2")}>/</span>
              <span className={cx("text-danger")}>Login</span>
            </div>
          </div>
          <div className={cx("container my-5 d-flex justify-content-center")} >
            <form action='' method='post' className={cx("p-5")}>
              <h3>Sign In</h3>
              <div className={cx("form-group", "mt-3 w-100")} >
                <input type="text" name="infoUser" placeholder="Email or Username" className={cx("p-3 w-100")} />
              </div>
              <div className={cx("form-group", "mt-3 w-100")} >
                <input type="password" name="password" placeholder="Enter your password" className={cx("p-3 w-100")} />
              </div>
              <div className={cx("form-group", "mt-3 w-100 d-flex justify-content-between align-items-center")} >
                <div>
                  <input type="checkbox" name="rememberPass" id={cx("rememberPass")} className={cx("p-3")} />
                  <label htmlFor='rememberPass' className={cx("ml-2")}><b>Remember password</b></label>
                </div>
                <Link className={cx("text-danger")} >
                  <span>Forget Password?</span>
                </Link>
              </div>
              <button type="submit" id={cx("btnLogin")} className={cx("mt-3")}>Login</button>
            </form>
          </div>
        </main>
        :
        <main className={cx("mb-5")}>
          <div className={cx("w-100 bg-light p-5 text-center")}>
            <p className={cx("p-0 m-0")}>Register</p>
            <div className={cx("d-flex align-items-center justify-content-center")}>
              <Link to={'/'} className={cx("text-dark")} ><AiOutlineHome /></Link>
              <span className={cx("mx-2")}>/</span>
              <span className={cx("text-danger")}>Register</span>
            </div>
          </div>
          <div className={cx("container my-5 d-flex justify-content-center")} >
            <form action='' method='post' className={cx("p-5")}>
              <h3>Singup Form</h3>
              <div className={cx("form-group", "mt-3 w-100")} >
                <input type="text" name="fullname" placeholder="Full name" className={cx("p-3 w-100")} />
              </div>
              <div className={cx("form-group", "mt-3 w-100")} >
                <input type="email" name="email" placeholder="Enter your email" className={cx("p-3 w-100")} />
              </div>
              <div className={cx("form-group", "mt-3 w-100 d-flex justify-content-between")} >
                <input type="password" name="password" placeholder="Enter your password" className={cx("p-3 w-50 mr-4")} />
                <input type="password" name="repeatPass" placeholder="Repeat your password" className={cx("p-3 w-50")} />
              </div>
              <div className={cx("form-group", "mt-3 w-100")} >
                <input type="checkbox" name="checkRobot" id={cx("checkRobot")} className={cx("p-3")} />
                <label htmlFor='checkRobot' className={cx("ml-2")}><b>I'm not a robot</b></label>
              </div>
              <button type="submit" id={cx("btnRegister")} className={cx("mt-3")}>Register</button>
            </form>
          </div>
        </main>
      }
      </>
    </div>
  );
}

export default Login;