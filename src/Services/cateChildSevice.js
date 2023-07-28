import * as http from '../common/http';

const cateChildApi = "http://localhost:8000/catechild";

export const getAll = async () => {
  try {
    const res = await http.get(cateChildApi);
    return ([res, null]);
  } catch (err) {
    return ([null, err]);
  }
}