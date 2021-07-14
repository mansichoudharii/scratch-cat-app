import { ADD_TEMPORARY_STORE, CLEAR_TEMPORARY_STORE } from "./types";

// const initialState = {
//   data: 0,
//   message: null,
//   type: null,
// };

export default function TemporaryStore(state = [], action) {
  switch (action.type) {
    case ADD_TEMPORARY_STORE:
      return action.data;
    case CLEAR_TEMPORARY_STORE:
      return state;
    default:
      return state;
  }
}
