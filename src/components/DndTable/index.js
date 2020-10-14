import React, { Component } from "react";
import PropTypes from "prop-types";

import { Table } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "./Row";

import update from "immutability-helper";

import "antd/dist/antd.css";

class DndTable extends Component {
  moveRow = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);
    const { data } = this.props;
    const dragRow = data[dragIndex];
    const source = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    this.props.onDragEnd(source);
  };

  render() {
    const { tableProps, data } = this.props;
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          {...tableProps}
          dataSource={data}
          components={{
            body: {
              row: Row,
            },
          }}
          onRow={(_, index) => ({
            index,
            moveRow: this.moveRow,
          })}
        />
      </DndProvider>
    );
  }
}

DndTable.defaultProps = {
  tableProps: {}, // antd表格Props
  data: [], //dataSource
  onDragEnd: () => {},
};

DndTable.propTypes = {
  tableProps: PropTypes.object,
  data: PropTypes.array,
  onDragEnd: PropTypes.func,
};

export default DndTable;
