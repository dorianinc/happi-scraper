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
export const getProductsThunk =
  (data = { page, size }) =>
  async (dispatch) => {
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
    console.log("🖥️  res: ", res);
    console.log("🖥️  res: ", res);
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
export const deleteProductThunk = (productId) => async (dispatch) => {
  try {
    await window.api.product.deleteProduct(productId);
    dispatch(getProductsThunk());
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
      console.log("🖥️  action.products: ", action.products)
      return {
        ...state,
        allProducts: [...action.products],
        count: action.count,
      };
    case GET_SINGLE_PRODUCT:
      return { ...state, currentProduct: { ...action.product } };
    default:
      return state;
  }
};

export default productsReducer;
