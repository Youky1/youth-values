import Con from './constants';
export const changeShowingRangeAction = (payload: string) => ({
  type: Con.CHANGE_RANGE,
  payload,
});
export const toogleShowingTodoAction = () => ({
  type: Con.CHANGE_SHOWING_TODO,
});
export const toogleShowingTimingAction = () => ({
  type: Con.CHANGE_SHOWING_TIMING,
});
