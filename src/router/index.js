import React from "react";
import { HashRouter as Router, Route, Switch, NavLink } from "react-router-dom";

import Vertical from "./beautiful-dnd/base";
import Horizontal from "./beautiful-dnd/horizontal";
import MoveColumn from "./beautiful-dnd/columnMove";
import Performance from "./beautiful-dnd/performance";
import Grid from "./beautiful-dnd/grid";

// dnd
import Dnd from "./dnd/index";

// antd
import TableDnd from "./antd/table-dnd";

// react-sortable-hoc
import RshBasic from "./react-sortable-hoc/basic";
import RshBasicHandle from "./react-sortable-hoc/drag-handle";

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
    component: Dnd,
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

const renderLink = (list ,hasChildren, parentPath) =>
  list.map(({ path, title, children }, i) =>
    children ? (
      renderLink(children, true, title)
    ) : (
      <NavLink key={path} to={path}>
      {hasChildren && `${parentPath}`}{title} {i !== list.length - 1 && "---"}
      </NavLink>
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
      <div>{renderLink(routers)}</div>
      <Switch>{renderRoute(routers)}</Switch>
    </Router>
  );
};
