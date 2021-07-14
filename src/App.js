import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useDispatch, useSelector } from "react-redux";
import Icon from "./components/Icon";
import { executeQueue } from "./redux/actions";

export default function App() {
  const queue = useSelector((store) => store.executionQueue);
  const dispatch = useDispatch();
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div
          className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2"
          style={{ position: "relative" }}
        >
          <Sidebar /> <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <div
            style={{ position: "absolute", top: 5, cursor: "pointer" }}
            onClick={() => {
              dispatch(executeQueue({ queue: queue }));
            }}
          >
            <Icon name="flag" size={20} className="text-green-600 mx-2" />
          </div>
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}
