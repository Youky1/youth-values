import * as Con from './constants';
import type {Dispatch} from 'redux';
import {addEvent, ensureEvent, deleteEvent, editEvent} from '@/api/timing';
import {failTip, successTip} from '~/src/util';
import {EventList} from '~/@types/timing';

export const initEventListAction = (payload: EventList) => ({
  type: Con.INIT_EVENT_LIST,
  payload,
});

export const addEventAction = (eventName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await addEvent(eventName);
      dispatch({
        type: Con.ADD_EVENT,
        payload: eventName,
      });
      successTip('添加事件成功');
    } catch (e) {
      failTip(e);
    }
  };
};

export const setCurrentEventAction = (eventName: string) => {
  return async (dispatch: Dispatch) => {
    const exsit = await ensureEvent(eventName);
    if (!exsit) {
      dispatch({
        type: Con.ADD_EVENT,
        payload: eventName,
      });
      successTip('当前事件不存在，已添加');
    }
    dispatch({
      type: Con.SET_CURRENT_EVENT,
      payload: eventName,
    });
  };
};

export const deleteEventAction =
  (name: string) => async (dispatch: Dispatch) => {
    try {
      await deleteEvent(name);
      dispatch({
        type: Con.DELETE_EVENT,
        payload: name,
      });
      successTip('删除事件成功');
    } catch (e) {
      failTip(e);
    }
  };

export const editEventAction =
  (oldName: string, newName: string) => async (dispatch: Dispatch) => {
    try {
      await editEvent(oldName, newName);
      dispatch({
        type: Con.EDIT_EVENT,
        payload: {oldName, newName},
      });
      successTip('编辑事件成功');
    } catch (e) {
      failTip(e);
    }
  };
