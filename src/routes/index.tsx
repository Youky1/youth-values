import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Todo from '@/pages/todo';
import Timing from '@/pages/timing';
import Statistics from '@/pages/Statistics';
import User from '@/pages/user';
import Login from '@/pages/login';
import Group from '@/pages/group';
export default function renderRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todo" />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="/timing" element={<Timing />}></Route>
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/group" element={<Group />} />
    </Routes>
  );
}
