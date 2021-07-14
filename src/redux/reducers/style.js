import {
  ADD_HORIZONTAL_TRANSFORM,
  ADD_MESSAGE,
  ADD_ROTATION,
  ADD_SCALE,
  ADD_VERTICAL_TRANSFORM,
  EXECUTE_QUEUE,
  HIDE_SPRITE,
  initialState,
  MESSAGE_TIMER,
  REMOVE_MESSAGE,
  SHOW_SPRITE,
} from "./types";

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROTATION:
      return {
        ...state,
        transform: state.transform + ` rotate(${action.data}deg)`,
      };
    case ADD_VERTICAL_TRANSFORM:
      return {
        ...state,
        transform: state.transform + ` translateX(${action.data}px)`,
      };
    case ADD_HORIZONTAL_TRANSFORM:
      return {
        ...state,
        transform: state.transform + ` translateY(${action.data}px)`,
      };
    case EXECUTE_QUEUE:
      return {
        ...state,
        transform: state.transform + action.data,
      };
    case ADD_SCALE:
      return {
        ...state,
        transform: state.transform + ` scale(${action.data})`,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        message: action.message,
        duration: action.duration,
        type: action.type,
        messageType: action.messageType,
      };
    case MESSAGE_TIMER:
      return {
        ...state,
        duration: state.duration - 1,
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        message: null,
        duration: 0,
        type: null,
      };
    case SHOW_SPRITE:
      return {
        ...state,
        display: "inline-block",
      };
    case HIDE_SPRITE:
      return {
        ...state,
        display: "none",
      };
    default:
      return state;
  }
}
