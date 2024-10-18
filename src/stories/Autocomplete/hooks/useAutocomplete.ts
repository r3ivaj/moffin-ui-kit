import { useState, useRef, useCallback, ChangeEvent, MouseEvent } from "react";
import { useClickAway } from "react-use";
import {
  filterOptions as filterOptionsUtil,
  moveSelectedOptionToTop,
} from "../Autocomplete.utils";
import { Option } from "../Autocomplete.types";

const HANDLE_OPEN_EVENT_TYPES = {
  ROOT_CLICK: "ROOT_CLICK",
  INPUT_CHANGE: "INPUT_CHANGE",
  INDICATOR_CLICK: "INDICATOR_CLICK",
} as const;

const HANDLE_CLOSE_EVENT_TYPES = {
  INPUT_BLUR: "INPUT_BLUR",
  INDICATOR_CLICK: "INDICATOR_CLICK",
  OPTION_CLICK: "OPTION_CLICK",
  CLICK_OUTSIDE: "CLICK_OUTSIDE",
} as const;

type HandleOpenEventType =
  (typeof HANDLE_OPEN_EVENT_TYPES)[keyof typeof HANDLE_OPEN_EVENT_TYPES];
type HandleCloseEventType =
  (typeof HANDLE_CLOSE_EVENT_TYPES)[keyof typeof HANDLE_CLOSE_EVENT_TYPES];

interface UseAutocompleteProps {
  id: string;
  options: Option[];
  initialValue: Option | null;
  onChange: (
    event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLLIElement>,
    value: Option | null,
  ) => void;
  onOptionClick: (
    event: MouseEvent<HTMLLIElement>,
    value: Option | null,
  ) => void;
}

interface UseAutocompleteReturn {
  getRootProps: () => {
    ref: React.RefObject<HTMLDivElement>;
    value: string;
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  };
  getInputProps: () => {
    id: string;
    ref: React.RefObject<HTMLInputElement>;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  getPopupIndicatorProps: () => {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    tabIndex: number;
    type: "button";
  };
  getListboxProps: () => {
    ref: React.RefObject<HTMLUListElement>;
  };
  getInputLabelProps: () => Record<string, never>;
  getOptionProps: (props: { option: Option; index: number }) => {
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
    "aria-selected": boolean;
  };
  popupOpen: boolean;
  focused: boolean;
  options: Option[];
}

const useAutocomplete = ({
  id,
  options: providedOptions,
  initialValue,
  onChange,
  onOptionClick,
}: UseAutocompleteProps): UseAutocompleteReturn => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    initialValue,
  );
  const [focused, setFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [options, setOptions] = useState<Option[]>(providedOptions);

  const handleOpen = useCallback(
    (_: React.SyntheticEvent, reason: HandleOpenEventType) => {
      if (open) return;
      setOpen(true);
    },
    [open],
  );

  const handleClose = useCallback(
    (_: React.SyntheticEvent | Event, reason: HandleCloseEventType) => {
      if (!open) return;
      setOpen(false);
    },
    [open],
  );

  const reorderOptions = useCallback(
    (selectedOption: Option | null) => {
      const optionsOrdered = moveSelectedOptionToTop({
        options: providedOptions,
        selectedOption,
      });
      setOptions(optionsOrdered);
    },
    [providedOptions],
  );

  const filterOptions = useCallback(
    (inputText: string): void => {
      setOptions(
        filterOptionsUtil({
          options: moveSelectedOptionToTop({
            options: providedOptions,
            selectedOption,
          }),
          searchText: inputText,
        }),
      );
    },
    [providedOptions, selectedOption],
  );

  const resetIfNoOptionSelected = () => {
    if (selectedOption === null) {
      setInputValue("");
      setOptions(providedOptions);
    }
  };

  useClickAway(rootRef, (event: Event) => {
    setFocused(false);
    handleClose(event, HANDLE_CLOSE_EVENT_TYPES.CLICK_OUTSIDE);
  });

  const getRootProps = () => ({
    ref: rootRef,
    value: inputValue,
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.target as Node)) {
        return;
      }
      if ((event.target as HTMLElement).getAttribute("id") !== id) {
        event.preventDefault();
      }
    },
    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
      handleOpen(event, HANDLE_OPEN_EVENT_TYPES.ROOT_CLICK);
      inputRef.current?.focus();
    },
  });

  const getInputProps = () => ({
    id,
    ref: inputRef,
    value: inputValue,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      handleOpen(event, HANDLE_OPEN_EVENT_TYPES.INPUT_CHANGE);
      const newValue = event.target.value;
      setInputValue(newValue);

      if (!newValue) {
        onChange(event, null);
        setSelectedOption(null);
        setOptions(providedOptions);
        return;
      }

      filterOptions(newValue);
    },
    onFocus: () => {
      setFocused(true);
    },
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      handleClose(event, HANDLE_CLOSE_EVENT_TYPES.INPUT_BLUR);
      resetIfNoOptionSelected();
    },
  });

  const getPopupIndicatorProps = () => ({
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      if (open) {
        handleClose(event, HANDLE_CLOSE_EVENT_TYPES.INDICATOR_CLICK);
      } else {
        handleOpen(event, HANDLE_OPEN_EVENT_TYPES.INDICATOR_CLICK);
      }
    },
    tabIndex: -1,
    type: "button" as const,
  });

  const getListboxProps = () => ({
    ref: listboxRef,
  });

  const getOptionProps = ({ option }: { option: Option }) => ({
    onClick: (event: React.MouseEvent<HTMLLIElement>) => {
      onChange(event, option);
      onOptionClick(event, option);
      setInputValue(option.label);
      setSelectedOption(option);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = window.setTimeout(() => {
        handleClose(event, HANDLE_CLOSE_EVENT_TYPES.OPTION_CLICK);
        reorderOptions(option);
      }, 400);

      setTimeoutId(newTimeoutId);
    },
    "aria-selected": selectedOption === option,
  });

  const getInputLabelProps = () => ({});

  return {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getListboxProps,
    getInputLabelProps,
    getOptionProps,
    popupOpen: open,
    focused,
    options,
  };
};

export default useAutocomplete;
