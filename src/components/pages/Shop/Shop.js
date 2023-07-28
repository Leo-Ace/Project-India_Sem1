import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from './shop.module.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import $ from 'jquery';
import { MainData } from "../../layouts/MainComponent";
import { CreateCart, CreateWishlist, DelProductInCarts, DelProductInWishlist, ProductsById, getProductsByPaginate } from "../../../Services/AllSevice";
import { createCart, deletePrdInCarts } from "../../../redux/reducers/carts";
import { AiOutlineHome } from "react-icons/ai";
import { deletePrdInWishlist, updateWishlist } from "../../../redux/reducers/wishlist";
import { BsCartPlus, BsCheckLg, BsFillHeartFill, BsHeart, BsSearch, BsStarFill } from "react-icons/bs";
import Swal from "sweetalert2";


const cx = classNames.bind(styles);

function Shop() {
  const dispatch = useDispatch();
  const {brand, cateChild, products} = useContext(MainData);

  const [keyname, setKeyname] = useState('');
  const [keyMenu, setKeyMenu] = useState({key: '', value: ''});
  const [keyBrand, setKeyBrand] = useState({key: '', value: ''});
  
  const [aboutPrice, setAboutPrice] = useState({to:undefined, from:undefined});
  const [productsInPage, setProductsInPage] = useState([]);
  const [prdDefault, setPrdDefault] = useState([]);
  const [page, setPage] = useState(1);
  const [listPrd, setListPrd] = useState([]);
  const [totalPage, setTotalPage] = useState([1]);
  const _carts = useSelector((state) => state.carts);
  const _wishlists = useSelector((state) => state.wishlist);
  const listIdInCart = _carts.map((item) => item.id);
  const listIdInWishlist = _wishlists.map((item) => item.id);
  const inpTo = useRef();
  const inpFrom = useRef();
  const inpTo2 = useRef();
  const inpFrom2 = useRef();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".selectElem")[0].value="0";
    // get data from api
    const run = async () => {
      let listProducts = await products;
      let listProCount = await products;
      let _page = Number(searchParams.get('_page'));
      const _nameCate = searchParams.get('name');
      const _idCate = searchParams.get('id');
      const _idlist = searchParams.get('idlist');
      const _idbrand = searchParams.get('idbrand');

      setKeyname(_nameCate && _idCate ? `name=${_nameCate}&id=${_idCate}&` : '');
      setKeyMenu({key: _idlist ? `idlist=${_idlist}&` : '', value: _idlist || ''});
      setKeyBrand({key: _idbrand ? `idbrand=${_idbrand}&` : '', value: _idbrand || ''});
      
      let keyuri = '';
      if(_nameCate && _idCate && _idlist && _idbrand) {
        listProducts = await products.filter(item => item.id_cate === Number(_idCate) && item.id_catechild === Number(_idlist) && item.id_brand === Number(_idbrand));
        keyuri = `id_cate=${_idCate}&id_catechild=${_idlist}&id_brand=${_idbrand}&`;
        listProCount = products.filter(item => item.id_cate === Number(_idCate) && item.id_brand === Number(_idbrand));
        setListPrd(listProCount);
      } else if(_nameCate && _idCate && _idbrand) {
        listProducts = await products.filter(item => item.id_cate === Number(_idCate) && item.id_brand === Number(_idbrand));
        listProCount = await products.filter(item => item.id_cate === Number(_idCate) && item.id_brand === Number(_idbrand));
        keyuri = `id_cate=${_idCate}&id_brand=${_idbrand}&`;
        setListPrd(listProCount);
      } else if(_nameCate && _idCate && _idlist) {
        listProducts = await products.filter(item => item.id_cate === Number(_idCate) && item.id_catechild === Number(_idlist));
        keyuri = `id_cate=${_idCate}&id_catechild=${_idlist}&`;
        listProCount = products.filter(item => item.id_cate === Number(_idCate));
        setListPrd(listProCount);
      } else if(_idlist && _idbrand) {
        listProducts = await products.filter(item => item.id_catechild === Number(_idlist) && item.id_brand === Number(_idbrand));
        keyuri = `id_catechild=${_idlist}&id_brand=${_idbrand}&`;
        listProCount = products.filter(item => item.id_brand === Number(_idbrand));
        setListPrd(listProCount);
      } else if(_nameCate && _idCate) {
        listProducts = await products.filter(item => item.id_cate === Number(_idCate));
        listProCount = await products.filter(item => item.id_cate === Number(_idCate));
        keyuri = `id_cate=${_idCate}&`;
        setListPrd(listProCount);
      } else if(_idlist) {
        setListPrd(listProducts);
        _page = 1;
        listProducts = await products.filter(item => item.id_catechild === Number(_idlist));
        keyuri = `id_catechild=${_idlist}&`;
      } else if(_idbrand) {
        _page = 1;
        listProducts = await products.filter(item => item.id_brand === Number(_idbrand));
        listProCount = await products.filter(item => item.id_brand === Number(_idbrand));
        keyuri = `id_brand=${_idbrand}&`;
        setListPrd(listProCount)
      } else setListPrd(listProducts);
      const limit = 12;
      const totalPage = [];
      const totalPrdInPage = await listProducts.length;
      for (let i = 1; i <= Math.ceil(totalPrdInPage / limit); i++) {
        totalPage.push(i);
      }
      setTotalPage(totalPage);
      if(_page) setPage(_page);
      const uri = {
        keyname: keyuri,
        page: _page === 0 ? 1 : _page,
        limit: limit
      }
      getProductsByPaginate(uri, async (data) => {
        if(aboutPrice.to && aboutPrice.from) {
          const result = listProducts.filter(item => item.price >= aboutPrice.to && item.price <= aboutPrice.from);
          const resultCount = listProCount.filter(item => item.price >= aboutPrice.to && item.price <= aboutPrice.from);
          const totalPage = [];
          for (let i = 1; i <= Math.ceil(result.length / limit); i++) {
            await totalPage.push(i);
          }
          await setTotalPage(totalPage);
          const dt = result.filter((item, index) => index < limit * (_page === 0 ? 1 : _page) && index >= limit*((_page === 0 ? 1 : _page) - 1));
          setListPrd(resultCount);
          setProductsInPage(dt);
          setPrdDefault(dt);
        } else {
          setProductsInPage(data);
          setPrdDefault(data);
        }
      });
    }
    run();
  }, [products, aboutPrice, searchParams]);

  useEffect(() => {
    setKeyMenu('');
    setKeyBrand('');
  }, [keyname]);
  
  const handleCart = (id_product, check) => {
    if (check) {
      _carts.forEach((item, index) => {
        if (item.id === id_product) {
          DelProductInCarts(item.id_cart, (data) => {
            const action = deletePrdInCarts(index);
            dispatch(action);
          });
        }
      });
    } else if (!check) {
      const idMax = Number(Math.max(...listIdInCart, 0));
      ProductsById(id_product, (data) => {
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
          const action = createCart({
            ...data,
            quantity: newData.quantity,
            id_cart: newData.id,
            totalPrice: data.price * newData.quantity,
          });
          dispatch(action);
        });
      });
    }
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
      const prd = products.find(item => item.id === id_product);
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
        const action = updateWishlist({...prd, id_wishlist: idMax + 1,state: 0})
        dispatch(action);
      });
    }
  };
  
  const handleSort = (e) => {
    if(Number(e.target.value) === 0) {
      setProductsInPage(prdDefault);
    } else if(Number(e.target.value) === 1) {
      const result = [...productsInPage].sort((a, b) => {
        if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        else if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        else return 0;
      });
      setProductsInPage(result);
    }else if(Number(e.target.value) === 2) {
      const result = [...productsInPage].sort((a, b) => {
        if(a.name.toUpperCase() < b.name.toUpperCase()) return 1;
        else if(a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        else return 0;
      });
      setProductsInPage(result);
    }else if(Number(e.target.value) === 3) {
      const result = [...productsInPage].sort((a, b) => a.price - b.price);
      setProductsInPage(result);
    }else if(Number(e.target.value) === 4) {
      const result = [...productsInPage].sort((a, b) => b.price - a.price);
      setProductsInPage(result);
    }
  }

  const handleCateChild = (id) => {
    const result = listPrd.filter(item=>item.id_catechild === id).length;
    return result;
  }

  return (
    <main className={cx("categoryComponent")}>
      <div className={cx("w-100 bg-light p-5 text-center")}>
        <p className={cx("p-0 m-0")}>Shop {searchParams.get('name') ? ' - ' + searchParams.get('name') : ''}</p>
        <div className={cx("d-flex align-items-center justify-content-center")}>
          <Link to={"/"} className={cx("text-dark")}>
            <AiOutlineHome />
          </Link>
          <span className={cx("mx-2")}>/</span>
          <span className={cx("text-danger")}>Shop</span>
        </div>
      </div>
      <div className={cx("box-main", "container-fluid p-0 d-flex flex-column flex-md-row mt-4")}>
        <div className={cx("filter", "col-12 d-block d-md-none")}>
          <div className={cx("row")}>
            <div className={cx("col-6 col-sm-4 col-md-3")}>
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle rounded-0 border border-dark w-100" type="button" data-toggle="dropdown"><b>{cateChild.find(item=>Number(item.id) === Number(keyMenu.value)) ? cateChild.find(item=>Number(item.id) === Number(keyMenu.value)).name : 'SELECT LIST'}</b>
                <span className="caret"></span></button>
                <ul className="dropdown-menu w-100">
                  <li
                    className={cx("")}
                  >
                    <Link to={`?${keyname}${keyBrand.key}`} onClick={()=>setKeyMenu({key:'', value: ''})} className={cx("text-decoration-none btn w-100 rounded-0 dropdown-item")}>
                      <span>
                        Reset
                      </span>
                    </Link>
                  </li>
                  {cateChild.map((item, index) => (
                    <li key={index}>
                      <Link to={
                        `?${keyname || ''}${keyBrand.key || ''}idlist=${item.id}`
                      } className={cx("text-decoration-none btn w-100 rounded-0 dropdown-item")}>
                        <p
                        className={cx(
                            "d-flex justify-content-between align-items-center p-0 m-0"
                          )}
                        >
                          <span>{item.name}</span>
                          <span>{handleCateChild(item.id)}</span>
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={cx("form-group col-6 col-sm-4 col-md-3")}>
              <div className={cx("dropdown")}>
                <button className={cx("btn btn-light dropdown-toggle rounded-0 border border-dark w-100")} type="button" data-toggle="dropdown"><b>SELECT COLOR</b>
                <span className={cx("caret")}></span></button>
                <ul className="dropdown-menu w-100">
                  <li className={cx("w-100")}><Link className={cx("text-decoration-none btn w-100 rounded-0 dropdown-item")}>Black</Link></li>
                </ul>
              </div>
            </div>
            <div className={cx("form-group col-6 col-sm-4 col-md-3")}>
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle rounded-0 border border-dark w-100" type="button" data-toggle="dropdown"><b>{brand.find(item=>Number(item.id) === Number(keyBrand.value)) ? brand.find(item=>Number(item.id) === Number(keyBrand.value)).name : 'SELECT BRAND'}</b>
                <span className="caret"></span></button>
                <ul className="dropdown-menu w-100">
                  <li
                    className={cx("")}
                  >
                    <Link to={`?${keyname || ''}${keyMenu.key || ''}`} className={cx("text-decoration-none btn w-100 rounded-0 dropdown-item")} onClick={()=>setKeyBrand({key: '', value: ''})}>
                      <span>
                        Reset
                      </span>
                    </Link>
                  </li>
                  {brand.map((item, index) => (
                    <li
                      className={cx("")}
                      key={index}
                    >
                      <Link to={`?${keyname || ''}${keyMenu.key || ''}idbrand=${item.id}`} className={cx("text-decoration-none btn w-100 rounded-0 dropdown-item")}>
                        <span>
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={cx("form-group")}>
            <div>
              <div
                className={cx("form-group", "d-flex justify-content-between")}
              >
                <input
                  type="number"
                  name="to"
                  placeholder="$ TO"
                  className={cx("w-50 px-1 mr-2 form-control rounded-0")}
                  ref={inpTo2}
                />
                <input
                  type="number"
                  name="from"
                  placeholder="$ FROM"
                  className={cx("w-50 px-1 form-control rounded-0")}
                  ref={inpFrom2}
                />
              </div>
              <button type="button" className={cx("btn btn-danger w-100 py-1 rounded-0")} onClick={() => setAboutPrice({
                to: inpTo2.current.value,
                from: inpFrom2.current.value
              })}>
                APPLY
              </button>
            </div>
          </div>
        </div>
        <div className={cx("filter", "d-none d-md-block col-lg-3 col-md-4")}>
          <div>
            <p
              className={cx(
                "py-2 mb-3 text-uppercase d-flex justify-content-between"
              )}
            >
              <b>CATEGORIES</b> <Link to={`?${keyname}${keyBrand.key}`} onClick={()=>setKeyMenu({key:'', value: ''})} className={cx("text-info btn-outline-light")}>Reset</Link>
            </p>
            <div>
              <ul className={cx("list-unstyled")}>
                {cateChild.map((item, index) => (
                  <Link to={
                      `?${keyname || ''}${keyBrand.key || ''}idlist=${item.id}`
                    } key={index} className={Number(keyMenu.value) === Number(item.id) ? cx("text-decoration-none btn w-100 rounded-0", "activeCateChild") : cx("text-decoration-none btn w-100 rounded-0")}>
                    <li
                    className={cx(
                        "text-secondary d-flex justify-content-between align-items-center"
                      )}
                      key={index}
                    >
                      <span>{item.name}</span>
                      <span>{handleCateChild(item.id)}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className={cx("mb-3")}>
            <p className={cx("py-2 mb-3")}>
              <b>PRICE</b>
            </p>
            <div>
              <div
                className={cx("form-group", "d-flex justify-content-between")}
              >
                <input
                  type="number"
                  name="to"
                  placeholder="$ TO"
                  className={cx("w-50 px-1 mr-2 form-control rounded-0")}
                  ref={inpTo}
                />
                <input
                  type="number"
                  name="from"
                  placeholder="$ FROM"
                  className={cx("w-50 px-1 form-control rounded-0")}
                  ref={inpFrom}
                />
              </div>
              <button type="button" className={cx("btn btn-danger w-100 py-1 rounded-0")}   onClick={() => setAboutPrice({
                to: inpTo.current.value,
                from: inpFrom.current.value
              })}>
                APPLY
              </button>
            </div>
          </div>
          <div>
            <p className={cx("py-2 mb-3")}>
              <b>COLOR</b>
            </p>
            <div>
              <ul className={cx("list-unstyled")}>
                <li className={cx("text-secondary")}>
                  <input
                    type="checkbox"
                    name="black"
                    id="black"
                    className={cx("mr-3")}
                    defaultChecked
                  />
                  <label htmlFor="black" className={cx("")}>
                    Black (20)
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p
              className={cx(
                "py-2 mb-3 text-uppercase d-flex justify-content-between"
              )}
            >
              <b>Brand</b> <Link to={`?${keyname}${keyMenu.key}`} onClick={()=>setKeyBrand({key: '', value: ''})} className={cx("text-info btn-outline-light")}>Reset</Link>
            </p>
            <div>
              <ul className={cx("list-unstyled container-fluid")}>
                <div className={cx("row")}>
                  {brand.map((item, index) => (
                    <li
                      className={Number(keyBrand.value) === Number(item.id) ? cx("col-lg-3 col-md-4 border border-1 p-0 m-1", "activeCateChild") : cx("col-lg-3 col-md-4 border border-1 p-0 m-1")}
                      key={index}
                    >
                      <Link to={`?${keyname || ''}${keyMenu.key || ''}idbrand=${item.id}`}>
                        <span>
                          <img
                            src={item.thumbnail}
                            alt={item.thumbnail}
                            className={cx("w-100")}
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("box-products", "col-lg-9 col-md-8 col-12")}>
          <div
            className={cx(
              "py-2 d-flex justify-content-between align-items-center"
            )}
          >
            <p className={cx("small text-secondary")}>
              Showing 1-12 Of {listPrd.length} Results
            </p>
            <div>
              <select className={cx("text-dark p-2", "selectElem")} onChange={handleSort}>
                <option value="0">Default Sorting</option>
                <option value="1">Name (A - Z)</option>
                <option value="2">Name (Z - A)</option>
                <option value="3">Price (Low - High)</option>
                <option value="4">Price (High - Low)</option>
              </select>
            </div>
          </div>
          <div className={cx("")}>
            <div className={cx("box-items")}>
              <div className={cx("row")}>
              {listPrd.length === 0 || productsInPage.length === 0 ? (
                <h1 className={cx("text-secondary")}>No products!</h1>
              ) : (
                productsInPage.map((item, index) => (
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
                          <div className={cx("name-product", "textStyle")}>{item.name}</div>
                        </Link>
                        <span className={cx("pt-1")}>
                          <b>${item.price}</b>
                        </span>
                      </div>
                      <div className={cx("box-act", "position-absolute p-2")}>
                        <ul className={cx("list-unstyled")}>
                          {listIdInCart.includes(item.id) ? (
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
                          {listIdInWishlist.includes(item.id) ? (
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
                ))
              )}
              </div>
            </div>
            {listPrd.length === 0 || productsInPage.length === 0 ? '' : (
              <div className={cx("w-100 d-flex justify-content-center mt-3")}>
                <nav aria-label="Page navigation example">
                  <ul className={cx("pagination", "d-flex list-unstyled")}>
                    <li className="page-item">
                      <Link to={page>1 ? `/shop?${keyname}_page=${page - 1}` : `/shop?${keyname}_page=1`} className="page-link" aria-label="Previous"
                        onClick={()=> {
                          if(page>1) setPage(prev=>  prev - 1);
                        }}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </Link>
                    </li>
                    {totalPage.map((item, index) => (
                      <li className="page-item" key={index}>
                        <Link to={`/shop?${keyname}_page=${item}`} className={(Number(searchParams.get('_page')) || 1) === item ? cx("page-link", "active") : cx("page-link")}>
                          {item}
                        </Link>
                      </li>
                    ))}
                    <li className="page-item">
                      <Link to={page<totalPage.length ? `/shop?${keyname}_page=${page + 1}` : `/shop?${keyname}_page=${totalPage.length}`} className="page-link" aria-label="Next"
                        onClick={()=> {
                          if(page<totalPage.length) setPage(prev=> prev + 1)
                        }}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shop;
