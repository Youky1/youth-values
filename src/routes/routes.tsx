import React from 'react';
import {RouteConfig} from '~/@types/route';
import Todo from '@/pages/todo';
import Detail from '../pages/todo/itemDetail/detail';

const routes: RouteConfig = [
  {
    path: '/todo',
    element: <Todo />,
    children: [
      {
        path: ':id',
        element: <Detail />,
      },
    ],
  },
];
export default routes;
