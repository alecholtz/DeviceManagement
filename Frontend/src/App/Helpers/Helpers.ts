import { HttpMethod, SortDirection } from "../Enums";
import { ISortSetting, IUrlParameter } from "../Interfaces";
import { HttpBody, HttpPath } from "../Types";

//FUTURE IMPROVEMENT: use i18next for translation rather than 'split caps'
export const SplitCaps = (text: string): string => text.replace(/([A-Z])/g, " $1").trim();

export const GenerateUrl = (baseUrl: string, path: HttpPath, parameters?: IUrlParameter[]): URL => {
  const stringPath = Array.isArray(path) ? path.join("/") : path?.toString();
  const url = new URL(stringPath ? `${baseUrl}/${stringPath}` : baseUrl);

  parameters?.forEach((p) => url.searchParams.append(p.name, p.value.toString()));
  return url;
};

export const GetOptions = (method: HttpMethod, body?: HttpBody): RequestInit => ({
  method,
  mode: "cors",
  headers: { "Content-Type": "application/json" },
  body: body ? JSON.stringify(body) : undefined,
});

export async function ParseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  return (text ? JSON.parse(text) : {}) as T;
}

export const SortRecords = <T>(records: T[], { sortColumn, sortDirection }: ISortSetting<T>): T[] =>
  [...records].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA === valueB) return 0;

    // Determine whether to use numerical or alphabetical sorting
    let comparison = 0;
    if (typeof valueA === "string" && typeof valueB === "string") {
      comparison = valueA.localeCompare(valueB);
    } else if (valueA < valueB) {
      comparison = -1;
    } else if (valueA > valueB) {
      comparison = 1;
    }

    return sortDirection === SortDirection.descending ? -comparison : comparison;
  });

export const CharacterLimitWarning = (value: string | undefined, maxLength: number): string => {
  if (!value || value.length <= maxLength) return `(${maxLength - (value?.length ?? 0)} Characters Remaining)`;

  return `(${value.length} of ${maxLength})`;
};

export const ArePartialsEqual = <T extends Record<string, string | number>>(newPartial: Partial<T>, originalPartial: Partial<T>): boolean => {
  const allKeys = new Set([...Object.keys(newPartial), ...Object.keys(originalPartial)]);

  return Array.from(allKeys).every((key) => {
    if (key in newPartial && key in originalPartial) {
      return newPartial[key] === originalPartial[key];
    }

    return false;
  });
};
