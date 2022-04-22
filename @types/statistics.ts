export type RangePickerValue =
  | [moment.Moment | null, moment.Moment | null]
  | null;
export interface defaultStatisticState {
  showingRange: RangePickerValue;
  showingTodo: boolean;
  showingTiming: boolean;
}
