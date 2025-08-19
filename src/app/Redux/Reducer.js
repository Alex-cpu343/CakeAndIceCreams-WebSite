import { 
  ADD_PRODUCT, 
  REMOVE_PRODUCT, 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  REDUCE_STOCK,
  TOGGLE_CART_VISIBILITY
, 
  REGISTER_USER, 
  LOGIN_USER, 
  LOGOUT_USER, 
  SAVE_PURCHASE_HISTORY
} from "./ActionType";

const initialState = {
  products: [
    { id: 1, name: "Chocolate Ice Cream", price: 3.5, stock: 20 },
    { id: 2, name: "Vanilla Ice Cream", price: 3.0, stock: 25 },
    { id: 3, name: "Strawberry Ice Cream", price: 3.2, stock: 15 },
    { id: 4, name: "Mango Ice Cream", price: 3.8, stock: 10 },
    { id: 5, name: "Chocolate Cake", price: 15.0, stock: 5 },
    { id: 6, name: "Vanilla Cream Cake", price: 14.5, stock: 7 },
    { id: 7, name: "Strawberry Cheesecake", price: 16.0, stock: 6 },
    { id: 8, name: "Red Velvet Cake", price: 18.0, stock: 4 },
    { id: 9, name: "Lemon Tart", price: 12.0, stock: 8 },
 
  ],
  cart: [],
  isCartVisible: false, // доданий стан видимості кошика
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case REMOVE_PRODUCT:
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    case ADD_TO_CART:
      const item = action.payload;
      const exist = state.cart.find(p => p.id === item.id);
      if (exist) {
        return {
          ...state,
          cart: state.cart.map(p =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, { ...item, quantity: 1 }] };
      }
    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter(p => p.id !== action.payload) };
    case REDUCE_STOCK:
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id
            ? { ...p, stock: Math.max(0, p.stock - action.payload.quantity) }
            : p
        ),
      };
    case TOGGLE_CART_VISIBILITY:
      return { ...state, isCartVisible: action.payload };
      case REGISTER_USER:
      // зберігаємо нового користувача
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
      };

    case SAVE_PURCHASE_HISTORY:
      return {
        ...state,
        users: state.users.map(user =>
          user.email === state.currentUser.email
            ? { 
                ...user, 
                purchaseHistory: [...(user.purchaseHistory || []), ...action.payload] 
              }
            : user
        ),
        currentUser: {
          ...state.currentUser,
          purchaseHistory: [...(state.currentUser.purchaseHistory || []), ...action.payload],
        }
      };
    default:
      return state;
  }
};

export default rootReducer;
