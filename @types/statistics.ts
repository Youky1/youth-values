export type RangePickerValue =
  | [moment.Moment | null, moment.Moment | null]
  | null;
export type validRangePickerValue = [moment.Moment, moment.Moment];
export interface defaultStatisticState {
  showingRange: validRangePickerValue;
  showingTodo: boolean;
  showingTiming: boolean;
}
export interface PieChart {
  title: string;
  domId: string;
  data: Array<{
    value: number;
    name: string;
  }>;
}
