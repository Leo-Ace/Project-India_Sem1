import * as http from '../common/http';

const categoriAPI = "http://localhost:8000/categories";

export const getAllCategory = async () => {
  try {
    const res = await http.get(categoriAPI);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}

export const getCategoryByKey = async ({type, value}) => {
  try {
    const res = await http.get(`${categoriAPI}?${type}=${value}`);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}
