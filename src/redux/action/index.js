import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/cart";

export const addCart = (product) => async (dispatch) => {
  try {
    const updatedProduct = {
      ...product,
      qty: product.qty || 1,
      sub_total: product.sub_total,
    };
    console.log(updatedProduct);
    const res = await axios.post(API_BASE_URL + "/add", updatedProduct);
    dispatch({
      type: "ADDITEM",
      payload: updatedProduct,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

export const delCart = (product) => async (dispatch) => {
  try {
    if (product.qty === 1) {
      await axios.delete(`${API_BASE_URL}/${product.id}`);
    } else {
      const updatedProduct = {
        ...product,
        qty: product.qty - 1,
        sub_total: (product.qty - 1) * product.price,
      };
      await axios.put(`${API_BASE_URL}/${product.id}`, updatedProduct);
    }
    dispatch({
      type: "DELITEM",
      payload: product,
    });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
  }
};

export const rmvCart = (product) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/${product.id}`);
    dispatch({
      type: "RMVITEM",
      payload: product,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};
