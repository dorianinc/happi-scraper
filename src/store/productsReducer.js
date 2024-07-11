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
export const getProductsThunk = (query) => async (dispatch) => {
  const res = await api.getAllProducts(query);
  const count = await dispatch(getCountThunk());
  await dispatch(getProducts(res, count));
  return res;
};

export const getCountThunk = () => async () => {
  // const res = await fetch(`/api/products/count`);
  // if (res.ok) {
  //   const data = await res.json();
  //   return data;
  // }
  return 10;
};

// get product details of single product
export const getSingleProductThunk = (productId) => async (dispatch) => {
  const res = await api.getProductById("J1uBUK9uuV1PRJOcnDbI");
  await dispatch(getSingleProduct(res));
  return res;
};

// add product
export const addProductThunk = (product) => async () => {
  const res = await api.createProduct(product);
  return res;
};

// update product
export const updateProductThunk = (productId) => async (dispatch) => {
  const res = await api.updateProductById(productId);
  await dispatch(updateProduct(res));
  return res;
};

// delete product
export const deleteProductThunk = (productId) => async (dispatch) => {
  const res = await api.deleteProductById(productId);
  return `Product #${productId} successfully deleted`;
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
