import { getAllBrand, getBrandById } from "./brandSevice";
import { deletePrdInCarts, getCarts, postCart, updateCart } from "./cartsSevice";
import { getAll } from "./cateChildSevice";
import { getAllCategory, getCategoryByKey } from "./categoriesSevice";
import { getAllProducts, getPrdByPage, getProductsByBrand, getProductsById } from "./productsSevice";
import { createWishlist, deleteWishlist, getWishlist } from "./wishlistSevice";

export const Categories = async (callback) => {
  const [data, err] = await getAllCategory();
  if(data) {
    callback(data);
    console.log('Get All Categories Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get All Categories Unsuccessful!');
  }
}

export const GetCateByKey = async (obj, callback) => {
  const [data, err] = await getCategoryByKey(obj);
  if(data) {
    callback(data);
    console.log('Get Category By Key Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Category By Key Unsuccessful!');
  }
}

export const Carts = async (callback) => {
  const [data, err] = await getCarts();
  if(data) {
    callback(data);
    console.log('Get Carts Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Carts Unsuccessful!');
  }
}

export const DelProductInCarts = async (id, callback) => {
  const [data, err] = await deletePrdInCarts(id);
  if(data) {
    callback(data);
    console.log('Delete prd Carts Successfully!');
  } else if(err) {
    callback([]);
    console.log('Delete prd Carts Unsuccessful!', err);
  }
}

export const CreateCart = async (newData, callback) => {
  const [data, err] = await postCart(newData);
  if(data) {
    callback(data);
    console.log('Create Cart Successfully!');
  } else if(err) {
    callback([]);
    console.log('Create Cart Unsuccessful!');
  }
}

export const UpdateCart = async (id, newData, callback) => {
  const [data, err] = await updateCart(id, newData);
  if(data) {
    callback(data);
    console.log('Update Cart Successfully!');
  } else if(err) {
    callback([]);
    console.log('Update Cart Unsuccessful!');
  }
}

export const Wishlist = async (callback) => {
  const [data, err] = await getWishlist();
  if(data) {
    callback(data);
    console.log('Get Wishlist Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Wishlist Unsuccessful!');
  }
}

export const DelProductInWishlist = async (id, callback) => {
  const [data, err] = await deleteWishlist(id);
  if(data) {
    callback(data);
    console.log('Delete prd Wishlist Successfully!');
  } else if(err) {
    callback([]);
    console.log('Delete prd Wishlist Unsuccessful!');
  }
}

export const CreateWishlist = async (newData, callback) => {
  const [data, err] = await createWishlist(newData);
  if(data) {
    callback(data);
    console.log('Create Wishlist Successfully!');
  } else if(err) {
    callback([]);
    console.log('Create Wishlist Unsuccessful!');
  }
}

export const Products = async (callback) => {
  const [data, err] = await getAllProducts();
  if(data) {
    callback(data);
    console.log('Get Products Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Products Unsuccessful!');
  }
}

export const ProductsById = async (id,callback) => {
  const [data, err] = await getProductsById(id);
  if(data) {
    callback(data);
    console.log('Get Product By Id Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Product By Id Unsuccessful!');
  }
}

export const ProductsByIdBrand = async (id,callback) => {
  const [data, err] = await getProductsByBrand(id);
  if(data) {
    callback(data);
    console.log('Get Product By Brand Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Product By Brand Unsuccessful!');
  }
}

export const Brands = async (callback) => {
  const [data, err] = await getAllBrand();
  if(data) {
    callback(data);
    console.log('Get All Brands Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get All Brands Unsuccessful!');
  }
}

export const GetBrandById = async (id, callback) => {
  const [data, err] = await getBrandById(id);
  if(data) {
    callback(data);
    console.log('Get Brand By Id Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Brand By Id UnsuccessFul!');
  }
}

export const GetAllCateChild = async (callback) => {
  const [data, err] = await getAll();
  if(data) {
    callback(data);
    console.log('Get All CateChild Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get All CateChild Unsuccessful!');
  }
}

export const getProductsByPaginate = async (obj, callback) => {
  const [data, err] = await getPrdByPage(obj);
  if(data) {
    callback(data);
    console.log('Get Products At Page Successfully!');
  } else if(err) {
    callback([]);
    console.log('Get Products At Page Unsuccessful!');
  }
}