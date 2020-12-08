import React, { Component } from "react";
import { Resizable } from "re-resizable";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

class Horizontal extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Resizable
          style={style}
          defaultSize={{
            width: "30%",
            height: 200,
          }}
          maxWidth="100%"
          minWidth="1"
        >
          001
        </Resizable>
        <Resizable
          style={style}
          defaultSize={{
            width: "30%",
            height: 200,
          }}
          maxWidth="100%"
          minWidth="1"
        >
          002
        </Resizable>
        <Resizable
          style={style}
          defaultSize={{
            width: "30%",
            height: 200,
          }}
          maxWidth="100%"
          minWidth="1"
        >
          002
        </Resizable>
        <div style={{ ...style, flex: 1, minWidth: "1px" }}>002</div>
      </div>
    );
  }
}

export default Horizontal;
