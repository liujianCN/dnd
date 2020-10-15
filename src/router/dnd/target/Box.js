import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};
export const Box = ({ name }) => {
  const [x, drag] = useDrag({
    item: { name, type: ItemTypes.BOX },
    end: (item, monitor) => {
      console.log(monitor);
      const dropResult = monitor.getDropResult();
      console.log(dropResult);
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      x: monitor.getSourceId(),
    }),
  });
  console.log(x);
  const opacity = x.isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};
