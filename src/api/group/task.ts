import instance from '../base';
import {Task} from '~/@types/group';
export const queryTaskByGroup = async (id: string) =>
  (await instance.get('/task/query', {params: {id}})) as Task[];

export const addTask = async (groupId: string, taskId: string) =>
  await instance.post('/task/add', {groupId, taskId});

export const finishTask = async (groupId: string, taskId: string) =>
  await instance.post('/task/finish', {groupId, taskId});
