import { fetchCsrfToken } from "./session";

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
  const res = await fetch(
    `/api/products/?page=${query.page}&size=${query.limit}`
  );
  if (res.ok) {
    const data = await res.json();
    const count = await dispatch(getCountThunk());
    await dispatch(getProducts(data, count));
    return data;
  }
};

export const getCountThunk = () => async () => {
  const res = await fetch(`/api/products/count`);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

// get product details of single product
export const getSingleProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);
  if (res.ok) {
    const data = await res.json();
    await dispatch(getSingleProduct(data));
    return data;
  }
};

// add product
export const addProductThunk = (product) => async () => {
  // const tokenResponse = await fetchCsrfToken();
  const headers = {
    "Content-Type": "application/json",
  };
  // if (tokenResponse.csrf_token) {
  //   headers["X-CSRF-Token"] = tokenResponse;
  // }

  const res = await fetch(`/api/products`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(product),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// update product
export const updateProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateProduct(data));
    return data;
  }
};

// delete product
export const deleteProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productId),
  });
  if (res.ok) {
    return `Product #${productId} successfully deleted`;
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
