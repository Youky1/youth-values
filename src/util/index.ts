import {Event, EventList} from '~/@types/timing';
export * from './message';
export * from './time';
export * from './charts';
export * from './data';
const colors = ['#99CCFF', '#3399CC', '#66CCCC', '#009999'];
export function getCardColor(e: Event) {
  const len = e.record.length;
  let color;
  if (len <= 0) {
    color = colors[0];
  } else if (len < 5) {
    color = colors[1];
  } else if (len < 10) {
    color = colors[2];
  } else {
    color = colors[3];
  }
  return {
    backgroundColor: color,
  };
}
export const getIndex = (list: EventList, name: string) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) {
      return i;
    }
  }
  return -1;
};
