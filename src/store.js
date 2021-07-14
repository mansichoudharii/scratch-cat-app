import rootReducer from "./redux/reducers";

const { createStore, combineReducers, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
