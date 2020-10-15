import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "./Constants";

export default function Knight() {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <>
      <DragPreviewImage
        src="data:image/png;base64,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"
        connect={preview}
      />
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontWeight: "bold",
          cursor: "move",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ♘
      </div>
    </>
  );
}
