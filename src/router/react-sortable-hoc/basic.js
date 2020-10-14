import React, {Component} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';

import update from 'immutability-helper';

import styled from 'styled-components';

const Container = styled.ul`
  /* width: 300px; */
  height: 200px;
  /* display: flex; */
  flex-wrap: wrap;
  background: skyblue;
  overflow: auto;
`

const Item = styled.li`
  height: 40px;
  width: 100px;
  background-color: #ccc;
  margin: 10px;
  padding: 10px;
  list-style: none;

`

const SortableItem = sortableElement(({value}) => <Item>{value}</Item>);

const SortableContainer = sortableContainer(({children}) => {
  return <Container>{children}</Container>;
});

export default class App extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    console.log(oldIndex, newIndex);
    const { items } = this.state;
    const dragItem = items[oldIndex];
    this.setState({
      items: update(items, {
        $splice: [
          [oldIndex, 1],
          [newIndex, 0, dragItem]
        ]
      })
    })
    // this.setState(({items}) => ({
    //   // items: arrayMove(items, oldIndex, newIndex),
    // }));
  };

  render() {
    const {items} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );
  }
}