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

// update product
export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

// delete product
export const deleteProduct = (products, count) => ({
  type: DELETE_PRODUCT,
  products,
  count,
});


/////////////////// Thunks ///////////////////

// get all products
export const getProductsThunk = (data) => async (dispatch) => {
  try {
    const products = await window.api.product.getProducts(data);
    const count = await window.api.product.getProductCount();
    if (products.success && count.success) {
      await dispatch(getProducts(products.payload, count.payload));
    }
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// get product details of single product
export const getSingleProductThunk = (productId) => async (dispatch) => {
  try {
    const res = await window.api.product.getSingleProduct(productId);
    if (res.success) {
      await dispatch(getSingleProduct(res.payload));
      return res;
    }
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// add product
export const addProductThunk = (productName) => async (dispatch) => {
  try {
    const res = await window.api.product.createProduct(productName, false);
    if (res.success) {
      await dispatch(getSingleProduct(res.payload));
      return res;
    }
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// update product details
export const updateProductThunk = (productId, data) => async (dispatch) => {
  try {
    const res = await window.api.product.updateProduct(productId, data);
    if (res.success) {
      await dispatch(getSingleProduct(res.payload));
      return res;
    }
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
      console.log("🖥️  products: ", products)
      const updatedProducts = products.filter((p) => p.id !== productId);
      console.log("🖥️  updatedProducts: ", updatedProducts)
      const count = await window.api.product.getProductCount();
      dispatch(deleteProduct(updatedProducts, count.payload));
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
    case UPDATE_PRODUCT:
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
