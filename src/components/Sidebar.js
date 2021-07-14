import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addHorizontalTransform,
  addMessage,
  addRotation,
  addScale,
  addTemporaryStore,
  addVerticalTransform,
  clearTemporaryStore,
  executeQueue,
  executionQueue,
  hideSprite,
  moveToRandomPosition,
  showSprite,
} from "../redux/actions";
import Icon from "./Icon";
import { useDrag, useDragLayer } from "react-dnd";
import { checkInput } from "./utils";

export default function Sidebar() {
  const dispatch = useDispatch();
  return (
    <div
      className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
      style={{ transform: "30deg" }}
    >
      <div className="font-bold"> {"Events"} </div>
      <div
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        style={{ ...commonStyle }}
      >
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        style={{ ...commonStyle }}
      >
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <MotionMoveWrapper value={10} />
      <div style={{ marginTop: 20 }} />
      <MotionTurnWrapper value={10} />
      <div style={{ marginTop: 20 }} />
      <MotionTurnWrapperInverted value={10} />
      <div style={{ marginTop: 20 }} />
      <RandomPosition />
      <div style={{ marginTop: 20 }} />
      <div className="font-bold"> {"Events"} </div>
      <SayHello mes={"Hello"} dur={2} />
      <div style={{ marginTop: 20 }} />
      <ThinkHello mes={"Hello"} dur={2} />
      <div style={{ marginTop: 20 }} />
      <Scale value={1} />
      <div style={{ marginTop: 20 }} />
      <ShowStripe />
      <div style={{ marginTop: 20 }} />
      <HideStripe />
    </div>
  );
}

const commonStyle = {
  height: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
  padding: 10,
  color: "white",
  fontSize: 11,
  cursor: "pointer",
};

const inputStyle = {
  width: 30,
  height: 20,
  marginRight: 10,
  marginLeft: 10,
  color: "black",
  textAlign: "center",
  borderRadius: 4,
  fontSize: 11,
  outline: "none",
};

export const MotionMoveWrapper = ({ value, style }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(value);
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "vertical",
      value: input,
    },
  }));
  return (
    <div
      ref={drag}
      style={{ ...commonStyle, background: "rgb(76,151,255)", ...style }}
      {...collected}
      onMouseOver={() => {
        dispatch(addTemporaryStore({ data: input }));
      }}
      onClick={(e) => {
        dispatch(addVerticalTransform({ pixel: Number(input) }));
      }}
    >
      Move
      <input
        style={inputStyle}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          if (checkInput(e.target.value)) {
            setInput(e.target.value);
          }
        }}
        value={input}
      />
      Steps
    </div>
  );
};

export const MotionTurnWrapper = ({ value, style }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(value);

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "rotation",
      value: input,
      reverse: false,
    },
  }));
  return (
    <div
      ref={drag}
      style={{ ...commonStyle, background: "rgb(76,151,255)", ...style }}
      {...collected}
      onMouseOver={() => {
        dispatch(addTemporaryStore({ data: input }));
      }}
      onClick={(e) => {
        dispatch(addRotation({ degree: Number(input) }));
      }}
    >
      {"Turn "}
      <Icon name="redo" size={15} className="text-white mx-2" />
      <input
        style={inputStyle}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          if (checkInput(e.target.value)) {
            setInput(e.target.value);
          }
        }}
        value={input}
      />
      {"degrees"}
    </div>
  );
};

export const MotionTurnWrapperInverted = ({ value, style }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(value);
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "rotationReverse",
      value: input,
    },
  }));
  return (
    <div
      ref={drag}
      style={{ ...commonStyle, background: "rgb(76,151,255)", ...style }}
      {...collected}
      onMouseOver={() => {
        dispatch(addTemporaryStore({ data: input }));
      }}
      onClick={(e) => {
        dispatch(addRotation({ degree: -Number(input) }));
      }}
    >
      {"Turn "}
      <Icon name="undo" size={15} className="text-white mx-2" />
      <input
        style={inputStyle}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          if (checkInput(e.target.value)) {
            setInput(e.target.value);
          }
        }}
        value={input}
      />
      {"degrees"}
    </div>
  );
};

export const RandomPosition = () => {
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "random",
    },
    end: (item, number) => {
      if (number.didDrop === "true") {
      }
    },
  }));
  return (
    <div
      ref={drag}
      style={{ ...commonStyle, background: "rgb(76,151,255)" }}
      {...collected}
      onClick={(e) => {
        dispatch(moveToRandomPosition());
      }}
    >
      Go To Random Position
    </div>
  );
};

export const SayHello = ({ dur, mes, style }) => {
  const [message, setMessage] = useState(mes);
  const [duration, setDuration] = useState(dur);
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "say",
      value: message,
      duration: 2,
    },
  }));
  return (
    <div
      ref={drag}
      {...collected}
      style={{ ...commonStyle, background: "rgb(153,102,255)", ...style }}
      onMouseOver={() => {
        dispatch(
          addTemporaryStore({
            data: {
              value: message,
              duration: duration,
            },
          })
        );
      }}
      onClick={() => {
        dispatch(
          addMessage({
            message: message,
            duration: Number(duration),
            messageType: "say",
          })
        );
      }}
    >
      Say
      <input
        style={{ ...inputStyle, width: 50, marginRight: 5, marginLeft: 5 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      for
      <input
        style={inputStyle}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          if (checkInput(e.target.value)) {
            setDuration(e.target.value);
          }
        }}
        value={duration}
      />
      Seconds
    </div>
  );
};

export const ThinkHello = ({ dur, mes, style }) => {
  const [message, setMessage] = useState(mes);
  const [duration, setDuration] = useState(dur);
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "think",
      value: message,
      duration: duration,
    },
  }));
  return (
    <div
      ref={drag}
      {...collected}
      onMouseOver={() => {
        dispatch(
          addTemporaryStore({
            data: {
              value: message,
              duration: duration,
            },
          })
        );
      }}
      style={{ ...commonStyle, background: "rgb(153,102,255)", ...style }}
      onClick={() => {
        dispatch(
          addMessage({
            message: message,
            duration: Number(duration),
            messageType: "think",
          })
        );
      }}
    >
      Think
      <input
        style={{ ...inputStyle, width: 50, marginRight: 5, marginLeft: 5 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      for
      <input
        style={inputStyle}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          if (checkInput(e.target.value)) {
            setDuration(e.target.value);
          }
        }}
        value={duration}
      />
      Seconds
    </div>
  );
};

export const Scale = ({ value, style }) => {
  const [input, setInput] = useState(value);
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "scale",
      percentage: Number(input),
    },
  }));
  return (
    <div
      ref={drag}
      {...collected}
      style={{ ...commonStyle, background: "rgb(153,102,255)", ...style }}
      onClick={() => {
        dispatch(addScale({ percentage: Number(input) / 10 }));
      }}
    >
      change size by
      <input
        style={inputStyle}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          if (checkInput(e.target.value)) {
            setInput(e.target.value);
          }
        }}
        value={input}
      />
      percentage
    </div>
  );
};

export const ShowStripe = ({ style }) => {
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "show",
    },
    end: (item, number) => {
      if (number.didDrop === "true") {
      }
    },
  }));
  return (
    <div
      onClick={() => {
        dispatch(showSprite());
      }}
      ref={drag}
      style={{ ...commonStyle, background: "rgb(153,102,255)", ...style }}
      {...collected}
    >
      Show Stripe
    </div>
  );
};
export const HideStripe = ({ style }) => {
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item: {
      type: "hide",
    },
    end: (item, number) => {
      if (number.didDrop === "true") {
      }
    },
  }));
  return (
    <div
      onClick={() => {
        dispatch(hideSprite());
      }}
      ref={drag}
      style={{ ...commonStyle, background: "rgb(153,102,255)", ...style }}
      {...collected}
    >
      Hide Stripe
    </div>
  );
};
