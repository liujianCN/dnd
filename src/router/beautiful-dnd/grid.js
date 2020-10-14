import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const data = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "吃饭",
    },
    "task-2": {
      id: "task-2",
      content: "睡觉",
    },
    "task-3": {
      id: "task-3",
      content: "打豆豆",
    },
    "task-4": {
      id: "task-4",
      content: "task-4",
    },
    "task-5": {
      id: "task-5",
      content: "task-5",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TODO",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "column-2": {
      id: "column-2",
      title: "IN PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "DONE",
      taskIds: [],
    },
  },
  columnOrder: ["column-1"],
};

const ContainerTask = styled.div`
  padding: 5px;
  /* margin-bottom: 5px; */
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: ${(p) => (p.isDragging ? "lightYellow" : "white")};
  display: flex;
  align-items: center;
  /* flex: 1; */
  margin: 20px;
  width: 100px;
  height: 100px;
`;

const TaskControl = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  border-radius: 2px;
  background-color: yellow;
`;

class Task extends Component {
  render() {
    const { task } = this.props;

    return (
      <Draggable draggableId={task.id} index={this.props.index}>
        {(provided, snapshot) => {
          return (
            <ContainerTask
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
            >
              <TaskControl />
              {task.content}
            </ContainerTask>
          );
        }}
      </Draggable>
    );
  }
}

const ContainerColumn = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 2px;
  margin: 10px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h5`
  padding-left: 10px;
`;
const TaskList = styled.div`
  padding: 10px;
  transition: background-color 0.2s ease;
  background-color: ${(p) => (p.isDraggingOver ? "skyblue" : "white")};
  flex: 1;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* min-height: 250px; */
`;

class Column extends Component {
  render() {
    const { column, tasks, isDropDisabled } = this.props;

    return (
      <ContainerColumn>
        <Title>{column.title}</Title>
        <Droppable
          droppableId={column.id}
          // type={column.id === "column-3" ? "donec" : "activec"}
          isDropDisabled={isDropDisabled}
          direction="horizontal"
        >
          {(provided, snapshot) => {
            // console.log(snapshot);
            return (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, i) => (
                  <Task key={task.id} task={task} index={i} />
                ))}
                {provided.placeholder}
              </TaskList>
            );
          }}
        </Droppable>
      </ContainerColumn>
    );
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ContainerApp = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default class App extends Component {
  state = data;
  onDragStart = (start) => {
    const startIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({
      startIndex,
    });
  };

  onDragEnd = (result) => {
    // dropped outside the list
    // console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const end = this.state.columns[destination.droppableId];
    if (start === end) {
      const newTaskIds = reorder(
        start.taskIds,
        source.index,
        destination.index
      );

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      this.setState({
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(end.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      taskIds: endTaskIds,
    };

    this.setState({
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      },
    });
    this.setState({
      startIndex: null,
    });
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <ContainerApp>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => this.state.tasks[taskId]
            );
            const isDropDisabled = index < this.state.startIndex;
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isDropDisabled={isDropDisabled}
              />
            );
          })}
        </ContainerApp>
      </DragDropContext>
    );
  }
}
