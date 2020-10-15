import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./index.css";

export default ({ record, index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();

  //根据置顶🔝状态不同设置不同的type
  const type = record.top ? "DragableBodyTopRow" : "DragableBodyRow"
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? "drop-over-downward" : "drop-over-upward",
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className} ${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};