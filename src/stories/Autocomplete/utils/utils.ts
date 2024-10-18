import { Option } from "../Autocomplete.types";

/**
 * Normalizes a string by removing diacritics and converting to lowercase.
 * @param str - The string to normalize.
 * @returns The normalized string.
 */
function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Filters options based on the search text.
 * @param options - The array of options to filter.
 * @param searchText - The search text to filter by.
 * @returns An array of filtered options.
 */
export function filterOptions({
  options,
  searchText,
}: {
  options: Option[];
  searchText: string;
}): Option[] {
  const normalizedSearchText = normalizeString(searchText);

  return options.filter((option) => {
    const normalizedLabel = normalizeString(option.label);
    return normalizedLabel.includes(normalizedSearchText);
  });
}

/**
 * Moves the selected option to the top of the options list.
 * @param selectedOption - The currently selected option.
 * @param options - The array of all options.
 * @returns A new array with the selected option at the top.
 */
export function moveSelectedOptionToTop({
  selectedOption,
  options,
}: {
  selectedOption: Option | null;
  options: Option[];
}): Option[] {
  if (!selectedOption) return options;
  return [
    selectedOption,
    ...options.filter((option) => option.label !== selectedOption.label),
  ];
}
