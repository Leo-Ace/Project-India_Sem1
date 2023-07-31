import React, { createContext, useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Brands, Carts, Categories, GetAllCateChild, Products, Wishlist } from "../../Services/AllSevice";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/reducers/carts";
import { setWishlist } from "../../redux/reducers/wishlist";

export const MainData = createContext();

function MainComponent({children}) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [cateChild, setCateChild] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // get api
    Categories((data)=> setCategories(data));
    Brands((data) => setBrand(data));
    GetAllCateChild((data) => setCateChild(data));
    Products((data) => setProducts(data));
    
    Carts(async (data)=> {
      const action = setCart(data);
      dispatch(action);
    });
    Wishlist(async (data)=> {
      const action = setWishlist(data); 
      dispatch(action);
    });
  }, [dispatch]);

  return (
    <MainData.Provider value={{categories, brand, cateChild, products}}>
      <Header />
      {children}
      <Footer />
    </MainData.Provider>
  )
}

export default MainComponent;