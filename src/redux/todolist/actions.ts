import {
  ADD_TODO_ITEM,
  SET_TODO_LIST,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  TOGGLE_TODO_ITEM,
  SEARCH_TODO_ITEM,
  ADD_GROUP,
  DELETE_GROUP,
  SET_SHOW_DONE,
  SET_SHOW_LEVEL,
  SET_SHOW_DDL,
  SET_SHOW_GROUP,
} from './constants';
import {ITodoItem, ITodoItems} from '~/@types/todolist';
import {
  toggleTodoItem,
  getTodoList,
  deleteTodoItem,
  addGroup,
  removeGroup,
} from '@/api/todolist';
import type {Dispatch} from 'redux';
import {timeFillter} from '@/util';

// 任务列表相关
export const addTodoItemAction = (payload: ITodoItem) => ({
  type: ADD_TODO_ITEM,
  payload,
});
export const setTodoItemListAction = (payload: ITodoItems) => ({
  type: SET_TODO_LIST,
  payload: payload,
});

// 代办事项相关
export const updateTodoItemAction = (payload: ITodoItem) => ({
  type: UPDATE_TODO_ITEM,
  payload,
});
export const deleteTodoItemAction = (payload: number) => {
  return async (dispatch: Dispatch) => {
    await deleteTodoItem(payload);
    dispatch({
      type: DELETE_TODO_ITEM,
      payload,
    });
  };
};
export const toggleTodoItemAction = (id: number) => {
  return async (dispatch: Dispatch) => {
    await toggleTodoItem(id);
    dispatch({
      type: TOGGLE_TODO_ITEM,
      payload: id,
    });
  };
};

// 显示设置相关
export const searchItemAction = (name: string) => {
  return async (dispatch: Dispatch) => {
    const currentList = await getTodoList();
    dispatch({
      type: SEARCH_TODO_ITEM,
      payload: {
        name,
        currentList,
      },
    });
  };
};

// 分组管理相关
export const addGroupAction = (name: string) => async (dispatch: Dispatch) => {
  try {
    await addGroup(name);
    dispatch({type: ADD_GROUP, payload: name});
  } catch (e) {
    console.log(e);
  }
};

export const deleteGroupAction =
  (name: string) => async (dispatch: Dispatch) => {
    try {
      await removeGroup(name);
      dispatch({type: DELETE_GROUP, payload: name});
    } catch (e) {
      console.log(e);
    }
  };

// 显示筛选相关
export const setShowDoneAction = (show: boolean) => ({
  type: SET_SHOW_DONE,
  payload: show,
});
// try {
//   const list = await getTodoList();
//   const payloadList = show ? list : list.filter(item => !item.done);
//   dispatch({
//     type: SET_SHOW_DONE,
//     payload: {
//       showDone: show,
//       list: payloadList,
//     },
//   });
// } catch (e) {
//   console.log(e);
// }

export const setShowLevelAction = (level: string) => ({
  type: SET_SHOW_LEVEL,
  payload: level,
});
// try {
//   const list = await getTodoList();
//   dispatch({
//     type: SET_SHOW_LEVEL,
//     payload:
//       level === '全部' ? list : list.filter(item => item.level === level),
//   });
// } catch (e) {
//   console.log(e);
// }

export const setShowDdlAction = (ddl: string) => ({
  type: SET_SHOW_DDL,
  payload: ddl,
});
// try {
//   const list = await getTodoList();
//   dispatch({
//     type: SET_SHOW_DDL,
//     payload: list.filter(item => timeFillter(item, ddl)),
//   });
// } catch (e) {
//   console.log(e);
// }
// };

export const setShowGroupAction = (group: string) => ({
  type: SET_SHOW_GROUP,
  payload: group,
});
//   try {
//     const list = await getTodoList();
//     dispatch({
//       type: SET_SHOW_GROUP,
//       payload:
//         group === '全部' ? list : list.filter(item => item.group === group),
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
