export interface ITodoItem {
  name: string;
  createDate: Date;
  ddl: Date | null;
  level: string;
  group: string;
  description: string;
  id?: number;
  done: boolean;
  doneDate?: Date;
}
export type ITodoItems = Array<ITodoItem>;
