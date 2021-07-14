import queue from "./queue";
import styleReducer from "./style";
import TemporaryStore from "./temporaryStore";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  style: styleReducer,
  executionQueue: queue,
  temporaryStore: TemporaryStore,
});

export default rootReducer;
