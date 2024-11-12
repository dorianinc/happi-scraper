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
export const getProductsThunk = (data = { page, size }) => async (dispatch) => {
  console.log("^^^^ In getProducts thunk ^^^^");
  try {
    const res = await window.api.product.getProducts(data);
    console.log("🖥️  res: ", res)
    const count = await window.api.product.getProductCount();
    await dispatch(getProducts(res, count));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// get product details of single product
export const getSingleProductThunk = (productId) => async (dispatch) => {
  console.log("^^^^ In getSingleProduct thunk ^^^^");
  try {
    const res = await window.api.product.getSingleProduct(productId);
    await dispatch(getSingleProduct(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// add product
export const addProductThunk = (productName) => async (dispatch) => {
  console.log("^^^^ In addProduct thunk ^^^^");
  try {
    const res = await window.api.product.createProduct(productName);
    await dispatch(getSingleProduct(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// delete product
export const deleteProductThunk = (productId) => async (dispatch) => {
  console.log("^^^^ In deleteProduct thunk ^^^^");
  try {
    await window.api.product.deleteProduct(productId);
    dispatch(getProductsThunk());
  } catch (error) {
    console.log("error: ", error.message);
  }
};

////////////// Reducer //////////////////////

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
