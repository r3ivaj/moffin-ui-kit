import * as React from "react";
import {
  Root,
  Label,
  Input,
  Listbox,
  Option as OptionComponent,
  PopupIndicator,
} from "./components";
import clsx from "clsx";
import useAutocomplete from "./hooks/useAutocomplete";
import { Option } from "./Autocomplete.types";

export interface AutocompleteProps {
  /** Array of options */
  options: Option[];
  /** Label for the autocomplete */
  label: string;
  /** Subtext */
  subtext?: string;
  /** Start Adornment */
  startAdornment?: (props: { hovered: boolean }) => React.ReactNode;
}

export const Autocomplete = ({
  options: originalOptions,
  label,
  subtext,
  startAdornment,
}: AutocompleteProps) => {
  const [value, setValue] = React.useState<Option | null>(null);
  const [hovered, setHovered] = React.useState<boolean>(false);

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getInputLabelProps,
    getListboxProps,
    getOptionProps,
    popupOpen,
    focused,
    options,
  } = useAutocomplete({
    id: "autocomplete",
    options: originalOptions,
    value,
    onChange: (_, newValue) => setValue(newValue),
  });

  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <Root
          {...getRootProps()}
          focused={focused}
          hovered={hovered}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Label
            {...getInputLabelProps()}
            moveToTop={focused || value !== null}
          >
            {label}
          </Label>
          <Input {...getInputProps()} />
          <PopupIndicator
            {...getPopupIndicatorProps()}
            popupOpen={popupOpen}
            focused={focused}
          />
          {popupOpen && options.length > 0 && (
            <Listbox {...getListboxProps()}>
              {(options as Option[]).map((option, index) => (
                <OptionComponent
                  {...getOptionProps({ option, index })}
                  key={index}
                  startAdornment={startAdornment}
                >
                  {option.label}
                </OptionComponent>
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
