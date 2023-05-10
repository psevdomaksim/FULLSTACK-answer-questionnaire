import { FETCH_CATEGORIES } from "../../utils/AC_consts";

let initialState = {
  categories: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_CATEGORIES: {
      state = { ...state, categories: action.data }
      return state;
    }


    default:
      return state;
  }
};

export default usersReducer;