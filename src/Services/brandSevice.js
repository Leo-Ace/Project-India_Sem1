import * as http from '../common/http';

const categoriAPI = "http://localhost:8000/brands";

export const getAllBrand = async () => {
  try {
    const res = await http.get(categoriAPI);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const getBrandById = async (id) => {
  try {
    const res = await http.get(`${categoriAPI}/${id}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}