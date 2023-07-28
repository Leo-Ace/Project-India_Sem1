import * as http from '../common/http';

const productsAPI = "http://localhost:8000/products";

export const getAllProducts = async () => {
  try {
    const res = await http.get(productsAPI);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const getProductsById = async (id) => {
  try {
    const res = await http.get(`${productsAPI}/${id}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const getProductsByBrand = async (id) => {
  try {
    const res = await http.get(`${productsAPI}?id_brand=${id}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const getPrdByPage = async ({keyname ,page, limit}) => {
  try {
    const res = await http.get(`${productsAPI}?${keyname}_page=${page}&_limit=${limit}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}