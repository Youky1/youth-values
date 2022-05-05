export interface GroupItem {
  id: string;
  description: string;
  owner: string;
  users: string[];
  createDate: string;
}
export interface Task {
  taskId: string;
  groupId: string;
  createDate: string;
  completed: number;
}
