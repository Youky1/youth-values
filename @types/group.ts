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
export interface Record {
  early: {
    user: string;
    time: string;
  };
  late: {
    user: string;
    time: string;
  };
}
