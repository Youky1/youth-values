export interface Record {
  start: Date;
  end: Date;
  length: number;
}
export interface Event {
  name: string; // 事件名称
  record: Array<Record>; // 计时历史
  isDone: boolean;
}
export type EventList = Array<Event>;
export interface defaultTimingState {
  eventList: EventList;
  currentEvent: string;
  isTiming: boolean;
}
