import {
  ADD_EXECUTION_QUEUE,
  ADD_HORIZONTAL_TRANSFORM,
  ADD_MESSAGE,
  ADD_ROTATION,
  ADD_SCALE,
  ADD_TEMPORARY_STORE,
  ADD_VERTICAL_TRANSFORM,
  CLEAR_TEMPORARY_STORE,
  HIDE_SPRITE,
  MESSAGE_TIMER,
  REMOVE_MESSAGE,
  SHOW_SPRITE,
} from "../reducers/types";

export const addRotation = ({ degree }) => {
  return {
    type: ADD_ROTATION,
    data: degree,
  };
};

export const addHorizontalTransform = ({ pixel }) => {
  return {
    type: ADD_HORIZONTAL_TRANSFORM,
    data: pixel,
  };
};

export const addVerticalTransform = ({ pixel }) => {
  return {
    type: ADD_VERTICAL_TRANSFORM,
    data: pixel,
  };
};

export const addScale = ({ percentage }) => {
  return {
    type: ADD_SCALE,
    data: percentage,
  };
};

export const executionQueue = ({ type, value, x, y }) => {
  return {
    type: ADD_EXECUTION_QUEUE,
    data: { type, value, x, y },
  };
};

export const moveToRandomPosition = () => {
  return (dispatch) => {
    dispatch(addVerticalTransform({ pixel: Math.floor(Math.random() * 100) }));
    dispatch(
      addHorizontalTransform({ pixel: Math.floor(Math.random() * 100) })
    );
  };
};

export const executeQueue = ({ queue }) => {
  return (dispatch) => {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].type === "vertical") {
        dispatch(addVerticalTransform({ pixel: queue[i].value }));
      } else if (queue[i].type === "rotation") {
        dispatch(addRotation({ degree: queue[i].value }));
      } else if (queue[i].type === "rotationReverse") {
        dispatch(addRotation({ degree: item[i].value }));
      } else if (queue[i].type === "random") {
        dispatch(moveToRandomPosition());
      } else if (queue[i].type === "say" || queue[i].type === "think") {
        dispatch(
          addMessage({
            message: queue[i].value,
            messageType: queue[i].type,
            duration: queue[i].duration,
          })
        );
      } else if (queue[i].type === "scale") {
        dispatch(addScale({ percentage: queue[i].percentage }));
      } else if (queue[i].type === "show") {
        dispatch(showSprite());
      } else if (queue[i].type === "hide") {
        dispatch(hideSprite());
      }
    }
  };
};

export const addMessage = ({ message, duration, messageType }) => {
  return {
    type: ADD_MESSAGE,
    message: message,
    duration: duration,
    messageType: messageType,
  };
};

export const removeMessage = () => {
  return {
    type: REMOVE_MESSAGE,
  };
};

export const messageTimer = () => {
  return {
    type: MESSAGE_TIMER,
  };
};

export const showSprite = () => {
  return {
    type: SHOW_SPRITE,
  };
};

export const hideSprite = () => {
  return {
    type: HIDE_SPRITE,
  };
};

export const addTemporaryStore = ({ data }) => {
  return {
    type: ADD_TEMPORARY_STORE,
    data: data,
  };
};

export const clearTemporaryStore = () => {
  return {
    type: CLEAR_TEMPORARY_STORE,
  };
};
