import React from "react";
import { HashRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { Menu } from "antd";

// dnd
import DndTarget from "./dnd/target";
import DndGame from "./dnd/game";
import DndTable from "./dnd/table-dnd";

// beautiful-dnd
import Vertical from "./beautiful-dnd/base";
import Horizontal from "./beautiful-dnd/horizontal";
import MoveColumn from "./beautiful-dnd/columnMove";
import Performance from "./beautiful-dnd/performance";
// import Grid from "./beautiful-dnd/grid";

// sortable-hoc
import RshBasic from "./react-sortable-hoc/basic";
import RshBasicHandle from "./react-sortable-hoc/drag-handle";
import RshTableSort from "./react-sortable-hoc/table";

// re-resizable
import ResizeHorizontal from "./resize/horizontal";

const { SubMenu } = Menu;

const routers = [
  {
    path: "/dnd",
    title: "dnd",
    children: [
      {
        path: "/d-target",
        title: "target",
        component: DndTarget,
      },
      {
        path: "/d-game",
        title: "game",
        component: DndGame,
      },
      {
        path: "/table-dnd",
        title: "table",
        component: DndTable,
      },
    ],
  },
  {
    path: "/beautiful-dnd",
    title: "beautiful-dnd",
    children: [
      {
        path: "/b-v",
        title: "vertical",
        component: Vertical,
      },
      {
        path: "/b-h",
        title: "horizontal",
        component: Horizontal,
      },
      {
        path: "/b-m",
        title: "move-column",
        component: MoveColumn,
      },
      {
        path: "/b-p",
        title: "performance",
        component: Performance,
      },
    ],
  },
  {
    path: "/sortable-hoc",
    title: "sortable-hoc",
    children: [
      {
        path: "/s-basic",
        title: "basic",
        component: RshBasic,
      },
      {
        path: "/s-basic-handle",
        title: "basic-handle",
        component: RshBasicHandle,
      },
      {
        path: "/s-table-sort",
        title: "table-sort",
        component: RshTableSort,
      },
    ],
  },
  {
    path: "/re-resizable",
    title: "re-resizable",
    children: [
      {
        path: "/re-horizontal",
        title: "horizontal",
        component: ResizeHorizontal,
      },
    ],
  },
];

const renderLink = (list) =>
  list.map(({ path, title, children }) =>
    children ? (
      <SubMenu key={path} title={title}>
        {renderLink(children)}
      </SubMenu>
    ) : (
      <Menu.Item key={path}>
        <NavLink to={path}>{title}</NavLink>
      </Menu.Item>
    )
  );

const renderRoute = (list) =>
  list.map(({ path, component, children }, i) =>
    children ? (
      renderRoute(children)
    ) : (
      <Route key={path} path={path} exact component={component} />
    )
  );

export default (props) => {
  return (
    <Router>
      <Menu mode="horizontal" style={{ marginBottom: 50 }}>
        {renderLink(routers)}
      </Menu>
      <Switch>{renderRoute(routers)}</Switch>
    </Router>
  );
};
