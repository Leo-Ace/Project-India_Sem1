import React, { createContext, useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Brands, Carts, Categories, GetAllCateChild, Products, ProductsById, Wishlist } from "../../Services/AllSevice";
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
    
    Carts(async (data1)=> {
      let result = [];
      await data1.forEach(async (item, index) => {
        await ProductsById(item.id_product, async (data2)=> {
          const n = await {...data2, quantity:item.quantity, id_cart:item.id, totalPrice: data2.price * item.quantity};
          result.push(n);
          if(data1.length === index + 1) {
            const action = setCart(result);
            dispatch(action);
          }
        });
      });
    });
    Wishlist(async (data1)=> {
      let result = [];
      await data1.forEach(async (item, index) => {
        await ProductsById(item.id_product, async (data2)=> {
          const n = {...data2, id_wishlist:item.id, status: item.status};
          result.push(n);
          if(data1.length === index + 1) {
            const action = setWishlist(result); 
            dispatch(action);
          }
        });
      });
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