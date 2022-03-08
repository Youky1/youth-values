import React from 'react';
import {RouteConfig} from '~/@types/route';
import Todo from '@/pages/todo';

const routes: RouteConfig = [
  {
    path: '/todo',
    element: <Todo />,
  },
];
export default routes;
