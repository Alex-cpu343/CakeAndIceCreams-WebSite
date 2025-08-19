import { 
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_CART,
  REDUCE_STOCK,
  TOGGLE_CART_VISIBILITY,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_PURCHASE_HISTORY
} from "./ActionType";

// ================== PRODUCTS ==================
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

// ================== CART ==================
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const loadCart = (cartData) => ({
  type: LOAD_CART,
  payload: cartData,
});

export const reduceStock = (id, quantity) => ({
  type: REDUCE_STOCK,
  payload: { id, quantity },
});

export const toggleCartVisibility = (isVisible) => ({
  type: TOGGLE_CART_VISIBILITY,
  payload: isVisible,
});

// thunk: додає товар у кошик і зменшує запас
export const addProductToCart = (product) => {
  return (dispatch) => {
    dispatch(addToCart(product));
    dispatch(reduceStock(product.id, 1));
  };
};

// thunk: видаляє товар з кошика і повертає на склад
export const removeProductFromCart = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().cart;
    const product = cart.find((p) => p.id === productId);
    if (product) {
      dispatch(removeFromCart(productId));
      dispatch(reduceStock(productId, product.quantity));
    }
  };
};

// ================== USER ==================
export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});

export const loginUser = (credentials) => ({
  type: LOGIN_USER,
  payload: credentials,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// ================== HISTORY ==================
export const savePurchaseHistory = (history) => ({
  type: SAVE_PURCHASE_HISTORY,
  payload: history,
});
