import React, { Component } from "react";
import { Table } from "antd";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

import update from "immutability-helper";

import "./table.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "置顶状态",
    dataIndex: "top",
    render: (isTop) => isTop && "置顶",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown 1",
    age: 31,
    address: "New York No. 1 Lake Park",
    top: true,
  },
  {
    key: "2",
    name: "Jim Green 2",
    age: 32,
    address: "London No. 1 Lake Park",
    top: true,
  },
  {
    key: "3",
    name: "Joe Black 3",
    age: 33,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Joe Black 4",
    age: 34,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Joe Black 5",
    age: 35,
    address: "Sidney No. 1 Lake Park",
  },
];

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => (
  <tbody id="xx" {...props} />
));

export default class SortableTable extends Component {
  state = {
    dataSource: data,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    const dragItem = dataSource[oldIndex];
    this.setState({
      dataSource: update(dataSource, {
        $splice: [
          [oldIndex, 1],
          [newIndex, 0, dragItem],
        ],
      }),
    });
  };

  DraggableBodyRow = ({ record, index, className, style, ...restProps }) => {
    // const { dataSource } = this.state;
    // // function findIndex base on Table rowKey props and should always be a right array index
    // const index = dataSource.findIndex(
    //   (x) => x.index === restProps["data-row-key"]
    // );
    const collection = record.top ? "top" : "normal";
    return (
      <SortableItem index={index} collection={collection} {...restProps} />
    );
  };

  render() {
    const { dataSource } = this.state;
    const DraggableContainer = (props) => (
      <SortableContainer
        helperClass="row-dragging"
        // helperContainer={() => document.getElementById("xx")}
        onSortEnd={this.onSortEnd}
        lockAxis="y"
        {...props}
      />
    );
    return (
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        // rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: this.DraggableBodyRow,
          },
        }}
        onRow={(record, index) => ({
          record,
          index,
        })}
      />
    );
  }
}
