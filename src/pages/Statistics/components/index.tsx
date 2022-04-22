import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
import DataTodo from './DataTodo';
import DataTiming from './DataTiming';
export default function () {
  const {showingTodo, showingTiming} = useSelector(
    (state: RootState) => state.statistics
  );
  return (
    <div>
      {showingTodo && <DataTodo />}
      {showingTiming && <DataTiming />}
    </div>
  );
}
