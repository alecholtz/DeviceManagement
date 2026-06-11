import { SortDirection } from "../Enums";

export interface ISortSetting<T> {
  sortColumn: keyof T;
  sortDirection: SortDirection;
}
