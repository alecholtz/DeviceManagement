import { ISortSetting } from "./ISortSetting";

export interface IDashboardState<T, V> {
  filterSettings: V;
  sortSetting: ISortSetting<T>;
  page: number;
  rowsPerPage: number;
}
