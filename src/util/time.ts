import moment from 'moment';
export const formatTime = (time: Date) => moment(time).format('YY-MM-DD');
