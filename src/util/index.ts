import {Event, EventList} from '~/@types/timing';
export * from './message';
export * from './time';
export * from './charts';
export * from './data';
const colors = ['#99CCFF', '#3399CC', '#66CCCC', '#009999'];
export function getCardColor(e: Event) {
  const len = e.record.reduce.length;
  let color;
  if (len <= 5) {
    color = colors[0];
  } else if (len < 20) {
    color = colors[1];
  } else if (len < 50) {
    color = colors[1];
  } else {
    color = colors[2];
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
