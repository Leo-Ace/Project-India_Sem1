import * as http from '../common/http';

const cartsAPI = "http://localhost:8000/carts";

export const getCarts = async () => {
  try {
    // const res = await http.get(cartsAPI);
    // const result = [];
    // res.forEach(async (item) => {
    //   const [data2, err2] = await getProductsById(item.id_product);
    //   const obj = {...data2, quantity:item.quantity, id_cart:item.id, totalPrice: data2.price * item.quantity};
    //   result.push(await obj);
    //   Object.preventExtensions(obj);
    // });
    // return ([result, null]);
    const res = await http.get(cartsAPI);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const deletePrdInCarts = async (id) => {
  try {
    const res = await http.remove(`${cartsAPI}/${id}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const getPrdInCarts = async (id) => {
  try {
    const res = await http.get(`${cartsAPI}?id_product=${id}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const postCart = async (data) => {
  try {
    const res = await http.post(cartsAPI, data);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const updateCart = async (id, data) => {
  try {
    const res = await http.put(`${cartsAPI}/${id}`, data);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}