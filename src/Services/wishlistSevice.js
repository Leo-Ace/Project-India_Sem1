import * as http from '../common/http';

const wishlistAPI = "http://localhost:8000/wishlist";

export const getWishlist = async () => {
  try {
    const res = await http.get(wishlistAPI);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const deleteWishlist = async (id) => {
  try {
    const res = await http.remove(`${wishlistAPI}/${id}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const createWishlist = async (data) => {
  try {
    const res = await http.post(wishlistAPI, data);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}