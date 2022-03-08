export interface HeaderMenu {
  text: string;
  icon: string;
  path: string;
}

export interface InputConfig {
  callback: Function;
  icon: string;
  tip?: string;
  placeholder?: string;
  defaultContent?: string;
}
