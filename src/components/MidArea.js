import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { executionQueue } from "../redux/actions";
import {
  HideStripe,
  MotionMoveWrapper,
  MotionTurnWrapper,
  MotionTurnWrapperInverted,
  SayHello,
  Scale,
  ShowStripe,
  ThinkHello,
} from "./Sidebar";

export default function MidArea() {
  const dispatch = useDispatch();
  const queue = useSelector((store) => store.executionQueue);
  const tempStore = useSelector((store) => store.temporaryStore);
  const [collectedProps, drop] = useDrop(() => ({
    accept: "item",
    drop: (item, monitor) => {
      const { x, y } = monitor.getClientOffset();
      dispatch(executionQueue({ type: item.type, value: item.value, x: x, y }));
    },
  }));


  return (
    <div className="flex-1 h-full overflow-auto" ref={drop}>
      {queue.length > 0
        ? queue.map((item, i) => {
            const tempStyle = {
              left: item.x - 80,
              top: item.y - 15,
              position: "fixed",
            };
            if (item.type === "vertical") {
              return (
                <MotionMoveWrapper
                  key={i}
                  value={tempStore}
                  style={tempStyle}
                  isMoved={true}
                />
              );
            } else if (item.type === "rotation") {
              return (
                <MotionTurnWrapper
                  key={i}
                  value={tempStore}
                  style={tempStyle}
                />
              );
            } else if (item.type === "rotationReverse") {
              return (
                <MotionTurnWrapperInverted
                  key={i}
                  value={tempStore}
                  style={tempStyle}
                />
              );
            } else if (item.type === "say") {
              return (
                <SayHello
                  key={i}
                  style={tempStyle}
                  dur={tempStore.duration}
                  mes={tempStore.value}
                />
              );
            } else if (item.type === "think") {
              return (
                <ThinkHello
                  key={i}
                  style={tempStyle}
                  dur={tempStore.duration}
                  mes={tempStore.value}
                />
              );
            } else if (item.type === "scale") {
              return <Scale style={tempStyle} key={i} />;
            } else if (item.type === "show") {
              return <ShowStripe style={tempStyle} key={i} />;
            } else if (item.type === "hide") {
              return <HideStripe style={tempStyle} key={i} />;
            }
            return <div></div>;
          })
        : []}
    </div>
  );
}
