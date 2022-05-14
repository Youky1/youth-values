import instance from '../base';
import {Task, Record} from '~/@types/group';
export const queryTaskByGroup = async (id: string) =>
  (await instance.get('/task/query', {params: {id}})) as Task[];

export const addTask = async (groupId: string, taskId: string) =>
  await instance.post('/task/add', {groupId, taskId});

export const finishTask = async (
  groupId: string,
  taskId: string,
  userId: string
) => await instance.post('/task/finish', {groupId, taskId, userId});

export const getTaskRecord = async (groupId: string) =>
  (await instance.get('/task/record', {params: {groupId}})) as Record;
