function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function filterOptions({ options, searchText }) {
  const normalizedSearchText = normalizeString(searchText);

  return options.filter((option) => {
    const normalizedLabel = normalizeString(option.label);
    return normalizedLabel.includes(normalizedSearchText);
  });
}

export function moveSelectedOptionToTop({ selectedOption, options }) {
  if (!selectedOption) return options;
  return [
    selectedOption,
    ...options.filter((option) => option.label !== selectedOption.label),
  ];
}
