import React, {Component} from 'react';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import update from 'immutability-helper';

import styled from 'styled-components';

const Container = styled.ul`
  width: 300px;
  height: 200px;
  display: flex;
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

const Handle = styled.span`
  height: 40px;
  background-color: yellow;
  margin: 10px;
  cursor: move;
`

const DragHandle = sortableHandle(() => <Handle>::</Handle>);

const SortableItem = sortableElement(({value}) => (
  <Item>
    <DragHandle />
    {value}
  </Item>
));

const SortableContainer = sortableContainer(({children}) => {
  return <Container>{children}</Container>;
});

export default class App extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
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
  };

  render() {
    const {items} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle axis="xy">
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );
  }
}