import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { Root, Label, Input, Listbox, Option } from "./components";

export interface AutocompleteProps<Option> {
  /** Array of options */
  options: Option[];
  /** Label for the autocomplete */
  label: string;
  /** Function to extract the label to display from an option */
  getOptionLabel?: (option: Option) => string;
}

const defaultGetOptionLabel = <Option,>(option: Option): string => {
  if (option && typeof option === "object" && "label" in option) {
    return String((option as { label: unknown }).label);
  }
  return String(option);
};

export const Autocomplete = <Option,>({
  options,
  label,
  getOptionLabel = defaultGetOptionLabel,
}: AutocompleteProps<Option>) => {
  const [value, setValue] = React.useState<Option | null>(null);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: "autocomplete",
    options,
    getOptionLabel,
    value,
    onChange: (event, newValue) => setValue(newValue),
  });

  return (
    <React.Fragment>
      <Label {...getInputLabelProps()}>{label}</Label>
      <Root {...getRootProps()} className={focused ? "focused" : ""}>
        <Input {...getInputProps()} />
      </Root>
      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as Option[]).map((option, index) => (
            <Option {...getOptionProps({ option, index })} key={index}>
              {getOptionLabel(option)}
            </Option>
          ))}
        </Listbox>
      )}
    </React.Fragment>
  );
};
