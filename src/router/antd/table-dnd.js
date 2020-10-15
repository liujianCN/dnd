import React, { Component } from "react";
import DndTable from "../../components/DndTable";

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
    render: (isTop) => isTop && "置顶"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const list = [
  {
    key: "1",
    name: "John Brown 1",
    age: 32,
    address: "New York No. 1 Lake Park",
    top: true,
  },
  {
    key: "2",
    name: "Jim Green 2",
    age: 42,
    address: "London No. 1 Lake Park",
    top: true,
  },
  {
    key: "3",
    name: "Joe Black 3",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Joe Black 4",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Joe Black 5",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

export default class DragSortingTable extends Component {
  state = {
    list,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list,
      });
    }, 2000);
  }

  handleDragEnd = (newList) => {
    this.setState({
      list: newList,
    });
  };

  render() {
    return (
      <DndTable
        tableProps={{ columns }}
        data={this.state.list}
        onDragEnd={this.handleDragEnd}
      />
    );
  }
}
