import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Todo from '@/pages/todo';
import Timing from '@/pages/timing';
export default function renderRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todo" />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="/timing" element={<Timing />}></Route>
    </Routes>
  );
}
