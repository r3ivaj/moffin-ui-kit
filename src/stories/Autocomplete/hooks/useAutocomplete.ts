import { useState, useRef, useCallback } from "react";
import { useClickAway } from "react-use";
import {
  filterOptions as filterOptionsUtil,
  moveSelectedOptionToTop,
} from "../utils/utils";

const HANDLE_OPEN_EVENT_TYPES = {
  ROOT_CLICK: "ROOT_CLICK",
  INPUT_CHANGE: "INPUT_CHANGE",
  INDICATOR_CLICK: "INDICATOR_CLICK",
};

const HANDLE_CLOSE_EVENT_TYPES = {
  INPUT_BLUR: "INPUT_BLUR",
  INDICATOR_CLICK: "INDICATOR_CLICK",
  OPTION_CLICK: "OPTION_CLICK",
  CLICK_OUTSIDE: "CLICK_OUTSIDE",
};

const useAutocomplete = ({ id, options: originalOptions, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listboxRef = useRef(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [options, setOptions] = useState(originalOptions);

  console.log({ focused, selectedOption, inputValue, options });

  const handleOpen = useCallback(
    (_, reason) => {
      if (open) return;
      setOpen(true);
    },
    [open],
  );

  const handleClose = useCallback(
    (_, reason) => {
      if (!open) return;

      setOpen(false);
    },
    [open],
  );

  const reorderOptions = useCallback(
    (selectedOption) => {
      setOptions(() =>
        moveSelectedOptionToTop({ options: originalOptions, selectedOption }),
      );
    },
    [originalOptions],
  );

  const resetInputValue = (event, newValue) => {};

  useClickAway(rootRef, (event) => {
    setFocused(false);
    handleClose(event, HANDLE_CLOSE_EVENT_TYPES.CLICK_OUTSIDE);
  });

  const getRootProps = () => {
    return {
      ref: rootRef,
      value: inputValue,
      onMouseDown: (event) => {
        // Prevent focusing the input if click is anywhere outside the Autocomplete
        if (!event.currentTarget.contains(event.target)) {
          return;
        }
        if (event.target.getAttribute("id") !== id) {
          event.preventDefault();
        }
      },
      onClick: (event) => {
        handleOpen(event, HANDLE_OPEN_EVENT_TYPES.ROOT_CLICK);
        inputRef.current.focus();
      },
    };
  };

  const filterOptions = (inputText) => {
    setOptions(() =>
      filterOptionsUtil({
        options: moveSelectedOptionToTop({
          options: originalOptions,
          selectedOption,
        }),
        searchText: inputText,
      }),
    );
  };

  const getInputProps = () => {
    return {
      id,
      ref: inputRef,
      value: inputValue,
      onChange: (event) => {
        handleOpen(event, HANDLE_OPEN_EVENT_TYPES.INPUT_CHANGE);
        const newValue = event.target.value;
        setInputValue(newValue);

        if (!newValue) {
          onChange(event, null);
          setSelectedOption(null);
          setOptions(originalOptions);
          return;
        }

        filterOptions(newValue);
      },
      onFocus: () => {
        setFocused(true);
      },
      onBlur: (event) => {
        setFocused(false);
        handleClose(event, HANDLE_CLOSE_EVENT_TYPES.INPUT_BLUR);
      },
    };
  };

  const getPopupIndicatorProps = () => {
    return {
      onClick: (event) => {
        if (open) {
          handleClose(event, HANDLE_CLOSE_EVENT_TYPES.INDICATOR_CLICK);
        } else {
          handleOpen(event, HANDLE_OPEN_EVENT_TYPES.INDICATOR_CLICK);
        }
      },
      tabIndex: -1,
      type: "button",
    };
  };

  const getListboxProps = () => {
    return {
      ref: listboxRef,
    };
  };

  const getOptionProps = ({ option, index }) => {
    const selected = selectedOption === option;

    return {
      onClick: (event) => {
        if (onChange) onChange(event, option);
        setInputValue(option.label);
        setSelectedOption(option);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          handleClose(event, HANDLE_CLOSE_EVENT_TYPES.OPTION_CLICK);
          reorderOptions(option);
        }, 400);

        setTimeoutId(newTimeoutId);
      },
      "aria-selected": selected,
    };
  };

  const getInputLabelProps = () => {
    return {};
  };

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
