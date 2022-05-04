import instance from '../base';
import {GroupItem} from '~/@types/group';

export const getGroupList = async () =>
  (await instance.get('/group/all')) as GroupItem[];

export const addGroup = async (info: {
  id: string;
  description: string;
  owner: string;
}) => await instance.post('/group/create', info);

export const removeGroup = async (id: string) =>
  await instance.post('/group/remove', {id});
