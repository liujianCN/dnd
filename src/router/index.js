import React from "react";
import { HashRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { Menu } from 'antd';

import Vertical from "./beautiful-dnd/base";
import Horizontal from "./beautiful-dnd/horizontal";
import MoveColumn from "./beautiful-dnd/columnMove";
import Performance from "./beautiful-dnd/performance";
import Grid from "./beautiful-dnd/grid";

// dnd
import DndTarget from "./dnd/target";
import DndGame from "./dnd/game";

// antd
import TableDnd from "./antd/table-dnd";

// react-sortable-hoc
import RshBasic from "./react-sortable-hoc/basic";
import RshBasicHandle from "./react-sortable-hoc/drag-handle";


const { SubMenu } = Menu

const routers = [
  {
    path: "/v",
    title: "Vertical",
    component: Vertical,
  },
  {
    path: "/h",
    title: "Horizontal",
    component: Horizontal,
  },
  {
    path: "/m",
    title: "MoveColumn",
    component: MoveColumn,
  },
  {
    path: "/p",
    title: "Performance",
    component: Performance,
  },
  {
    path: "/g",
    title: "Grid",
    component: Grid,
  },
  {
    path: "/dnd",
    title: "Dnd",
    children: [
      {
        path: "/dnd-target",
        title: "Dnd-Target",
        component: DndTarget,
      },
      {
        path: "/dnd-game",
        title: "Dnd-Game",
        component: DndGame,
      },
    ],
  },
  {
    path: "/antd",
    title: "Antd",
    children: [
      {
        path: "/table-dnd",
        title: "TableDnd",
        component: TableDnd,
      },
    ],
  },
  {
    path: "/rsh",
    title: "Rsh",
    children: [
      {
        path: "/basic",
        title: "Basic",
        component: RshBasic,
      },
      {
        path: "/basic-handle",
        title: "BasicHandle",
        component: RshBasicHandle,
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
      <Menu.Item  key={path}>
        <NavLink to={path}>
          {title}
        </NavLink>
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
      <Menu mode="horizontal" style={{marginBottom: 50}}>{renderLink(routers)}</Menu>
      <Switch>{renderRoute(routers)}</Switch>
    </Router>
  );
};
