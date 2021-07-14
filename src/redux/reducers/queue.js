import { ADD_EXECUTION_QUEUE, EXECUTE_QUEUE } from "./types";

export default function queue(state = [], action) {
  switch (action.type) {
    case ADD_EXECUTION_QUEUE:
      return state.concat([action.data]);
    case EXECUTE_QUEUE:
      return state;
    default:
      return state;
  }
}
