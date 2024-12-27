////////////// Action Creators ///////////////

export const GET_PRODUCTS = "products/GET_PRODUCTS";
export const GET_SINGLE_PRODUCT = "products/GET_SINGLE_PRODUCT";
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

export const deleteProduct = (products, count) => ({
  type: DELETE_PRODUCT,
  products,
  count
});


/////////////////// Thunks ///////////////////

// get all products
export const getProductsThunk = (data) => async (dispatch) => {
  try {
    const res = await window.api.product.getProducts(data);
    const count = await window.api.product.getProductCount();
    await dispatch(getProducts(res, count));
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// get product details of single product
export const getSingleProductThunk = (productId) => async (dispatch) => {
  try {
    const res = await window.api.product.getSingleProduct(productId);
    await dispatch(getSingleProduct(res));
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// add product
export const addProductThunk = (productName) => async (dispatch) => {
  try {
    const res = await window.api.product.createProduct(productName);
    await dispatch(getSingleProduct(res));
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// delete product
export const deleteProductThunk = (productId) => async (dispatch, getState) => {
  try {
    const res = await window.api.product.deleteProduct(productId);
    if (res.success) {
      const products = getState().products.allProducts;
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      dispatch(deleteProduct(updatedProducts, updatedProducts.length));
    }
  } catch (error) {
    console.error("error: ", error.message);
  }
};

////////////// Reducer //////////////////////

const initialState = {
  allProducts: [],
  currentProduct: null,
  count: 0,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.products],
        count: action.count,
      };
    case GET_SINGLE_PRODUCT:
      return { ...state, currentProduct: { ...action.product } };
      case DELETE_PRODUCT:
        return {
          ...state,
          currentProduct: null,
          allProducts: action.products,
          count: action.count,
        };
    default:
      return state;
  }
};

export default productsReducer;
