export interface ITodoItem {
  name: string;
  createDate: Date;
  ddl: Date;
  level: string;
  group: string;
  description: string;
  id?: number;
}
export type ITodoItems = Array<ITodoItem>;
