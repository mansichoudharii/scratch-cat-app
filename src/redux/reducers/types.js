export const ADD_ROTATION = "ADD_ROTATION";
export const ADD_VERTICAL_TRANSFORM = "ADD_VERTICAL_TRANSFORM";
export const ADD_EXECUTION_QUEUE = "ADD_EXECUTION_QUEUE";
export const EXECUTE_QUEUE = "EXECUTE_QUEUE";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const MESSAGE_TIMER = "MESSAGE_TIMER";
export const ADD_SCALE = "ADD_SCALE";
export const SHOW_SPRITE = "SHOW_SPRITE";
export const HIDE_SPRITE = "HIDE_SPRITE";
export const ADD_HORIZONTAL_TRANSFORM = "ADD_HORIZONTAL_TRANSFORM";
export const ADD_TEMPORARY_STORE = "ADD_TEMPORARY_STORE";
export const CLEAR_TEMPORARY_STORE = "CLEAR_TEMPORARY_STORE";

export const initialState = {
  transform: `rotate(0deg) translateX(0px) translateY(0px) scale(1.0)`,
  display: "inline-block",
  duration: 0,
  message: null,
  messageType: null,
};
