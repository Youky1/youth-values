import instance from '../base';
import {GroupItem} from '~/@types/group';

export * from './task';

export const getGroupList = async () =>
  (await instance.get('/group/all')) as GroupItem[];

export const addGroup = async (info: {
  id: string;
  description: string;
  owner: string;
}) => await instance.post('/group/create', info);

export const removeGroup = async (id: string) =>
  await instance.post('/group/remove', {id});

export const updateDescription = async (id: string, description: string) =>
  await instance.post('/group/update', {id, description});

export const addUser = async (id: string, userId: string) =>
  await instance.post('/group/join', {id, userId});

export const quitGroup = async (id: string, userId: string) =>
  await instance.post('/group/quit', {id, userId});
