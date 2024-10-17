import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import {
  Root,
  Label,
  Input,
  Listbox,
  Option,
  PopupIndicator,
} from "./components";
import clsx from "clsx";

export interface AutocompleteProps<Option> {
  /** Array of options */
  options: Option[];
  /** Label for the autocomplete */
  label: string;
  /** Function to extract the label to display from an option */
  getOptionLabel?: (option: Option) => string;
  /** Subtext */
  subtext?: string;
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
  subtext,
}: AutocompleteProps<Option>) => {
  const [value, setValue] = React.useState<Option | null>(null);
  const [hovered, setHovered] = React.useState<boolean>(false);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getPopupIndicatorProps,
    popupOpen,
    getListboxProps: defaultGetListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: "autocomplete",
    options,
    getOptionLabel,
    value,
    onChange: (_, newValue) => {
      setHovered(false);
      setValue(newValue);
    },
  });

  // Reorder options to put the selected value at the top
  const orderedOptions = React.useMemo(() => {
    if (value) {
      return [value, ...groupedOptions.filter((option) => option !== value)];
    }
    return groupedOptions;
  }, [groupedOptions, value]);

  // Custom getListboxProps implementation
  const getListboxProps = () => {
    return {
      ...defaultGetListboxProps(),
      ref: undefined,
    };
  };

  return (
    <React.Fragment>
      <div>
        <Root
          {...getRootProps()}
          focused={focused}
          hovered={hovered}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Label
            {...getInputLabelProps()}
            moveToTop={value !== null || focused}
          >
            {label}
          </Label>
          <Input {...getInputProps()} />
          <PopupIndicator
            {...getPopupIndicatorProps()}
            popupOpen={popupOpen}
            focused={focused}
          />
          {groupedOptions.length > 0 && (
            <Listbox {...getListboxProps()}>
              {(orderedOptions as Option[]).map((option, index) => (
                <Option {...getOptionProps({ option, index })} key={index}>
                  {getOptionLabel(option)}
                </Option>
              ))}
            </Listbox>
          )}
        </Root>
        <span
          className={clsx(
            "text-xs text-[#6B7280]",
            hovered && "drop-shadow-[0_4px_8px_rgba(64,67,68,0.24)]",
          )}
        >
          {subtext}
        </span>
      </div>
    </React.Fragment>
  );
};
