import * as React from "react";
// import { useAutocomplete } from "@mui/base/useAutocomplete";
import {
  Root,
  Label,
  Input,
  Listbox,
  Option,
  PopupIndicator,
} from "./components";
import clsx from "clsx";
import useAutocomplete from "./hooks/useAutocomplete";

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
  // const [internalOptions, setInternalOptions] =
  //   React.useState<Option[]>(options);

  // const {
  //   getRootProps,
  //   getInputLabelProps,
  //   getInputProps,
  //   getPopupIndicatorProps,
  //   popupOpen,
  //   getListboxProps: defaultGetListboxProps,
  //   getOptionProps,
  //   groupedOptions,
  //   focused,
  // } = useAutocomplete({
  //   id: "autocomplete",
  //   options: internalOptions,
  //   getOptionLabel,
  //   value,
  //   onChange: (_, newValue) => {
  //     setHovered(false);
  //     setValue(newValue);

  //     if (newValue) {
  //       const reorderedOptions = [
  //         newValue,
  //         ...internalOptions.filter((option) => option !== newValue),
  //       ];
  //       setInternalOptions(reorderedOptions);
  //     } else {
  //       setInternalOptions(options);
  //     }
  //   },
  // });

  // // Custom getListboxProps implementation
  // const getListboxProps = () => {
  //   return {
  //     ...defaultGetListboxProps(),
  //     ref: undefined,
  //   };
  // };

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getInputLabelProps,
    getListboxProps,
    getOptionProps,
    popupOpen,
    focused,
    groupedOptions,
  } = useAutocomplete({
    id: "autocomplete",
    options,
    value,
    onChange: (_, newValue) => setValue(newValue),
  });

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
          {popupOpen && groupedOptions.length > 0 && (
            <Listbox {...getListboxProps()}>
              {(groupedOptions as Option[]).map((option, index) => (
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
