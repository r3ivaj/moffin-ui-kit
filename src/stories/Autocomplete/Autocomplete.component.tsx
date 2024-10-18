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
  /**
   * Unique identifier for the input element.
   *
   * @example
   * <Autocomplete id="country-selector" />
   */
  id: string;

  /**
   * The initial selected value in the autocomplete input.
   * If set to `null`, no option will be selected by default.
   * This can be useful to pre-populate the input with a predefined option
   * when the component is first rendered.
   *
   * @example
   * <Autocomplete initialValue={{ label: 'México' }} />
   */
  initialValue: Option | null;

  /**
   * List of options that users can select from in the autocomplete dropdown.
   * Each option must contain a unique `label` to display to the user.
   */
  options: Option[];

  /**
   * Text label displayed above or inside the input field.
   * It helps users understand the purpose of the input.
   */
  label: string;

  /**
   * Optional text displayed below the input field.
   * It can provide additional guidance or information.
   */
  subtext?: string;

  /**
   * Optional custom element displayed at the start of each option in the dropdown list.
   * This can be used to add icons or other elements to enhance the visual presentation.
   * It receives a `hovered` prop, indicating if the option is currently being hovered.
   *
   * @param props.hovered - A boolean indicating whether the option is being hovered.
   * @returns A React node to be displayed at the start of each option.
   */
  optionStartAdornment?: (props: { hovered: boolean }) => React.ReactNode;

  /**
   * Optional custom CSS class name for the outermost container of the Autocomplete component.
   * This can be used to apply custom styles or modify the layout of the component.
   *
   * @example
   * <Autocomplete className="my-custom-class" />
   */
  className?: string;
}

export const Autocomplete = ({
  id,
  options: originalOptions,
  label,
  subtext,
  initialValue = null,
  optionStartAdornment,
  className,
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
    id,
    options: originalOptions,
    initialValue: initialValue,
    onChange: (_, newValue) => setValue(newValue),
    onOptionClick: () => setHovered(false),
  });

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <Root
        {...getRootProps()}
        focused={focused}
        hovered={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Label {...getInputLabelProps()} moveToTop={focused || value !== null}>
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
                startAdornment={optionStartAdornment}
              >
                {option.label}
              </OptionComponent>
            ))}
          </Listbox>
        )}
      </Root>
      <span
        className={clsx(
          "text-xs text-gray-600",
          hovered && "drop-shadow-[0_4px_8px_rgba(64,67,68,0.24)]",
        )}
      >
        {subtext}
      </span>
    </div>
  );
};
