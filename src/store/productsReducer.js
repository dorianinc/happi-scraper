import { ipcRenderer } from 'electron';
import * as api from "../firestore/api/products";


////////////// Action Creators ///////////////

export const GET_PRODUCTS = "products/GET_PRODUCTS";
export const GET_SINGLE_PRODUCT = "products/GET_SINGLE_PRODUCT";
export const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";
export const DELETE_PRODUCT = "products/DELETE_PRODUCT";

///////////// Action Creators ///////////////

// get all products
export const getProducts = (products, count) => ({
  type: GET_PRODUCTS,
  products,
  count,
});

// get single product
export const getSingleProduct = (product) => ({
  type: GET_SINGLE_PRODUCT,
  product,
});

// update single product
export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

/////////////////// Thunks ///////////////////

// get all products
export const getProductsThunk = (data = {page, size}) => async (dispatch) => {
  console.log("^^^^ In getProducts thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("get-products", data)
    const count = await ipcRenderer.invoke("get-product-count")
    await dispatch(getProducts(res, count));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// get total count of products 
// export const getCountThunk = () => async () => {
//   const data = await api.getProductCount()
//   return data;
// };

// get product details of single product
export const getSingleProductThunk = (productId) => async (dispatch) => {
  console.log("^^^^ In getSingleProduct thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("get-single-product", productId)
    await dispatch(getProducts(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// add product
export const addProductThunk = (productName) => async (dispatch) => {
  console.log("^^^^ In addProduct thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("create-product", productName)
    await dispatch(getSingleProduct(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};


// delete product
export const deleteProductThunk = (productId) => async (dispatch) => {
  console.log("^^^^ In deleteProduct thunk ^^^^")
  try {
    await ipcRenderer.invoke("delete-product", productId)
    dispatch(getProductsThunk())
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const productsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_PRODUCTS:
      newState = {
        items: action.products,
        count: action.count,
      };
      return newState;
    case GET_SINGLE_PRODUCT:
      newState = { ...action.product };
      return newState;
    default:
      return state;
  }
};

export default productsReducer;
