import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {RouteConfig} from '~/@types/route';
export default function renderRoutes(route: RouteConfig) {
  return (
    <>
      {route.map(item => (
        <Route
          path={item.path}
          element={item.element}
          key={item.path}
          index={item.index ? true : false}
        >
          {item.children && renderRoutes(item.children)}
        </Route>
      ))}
    </>
  );
}
