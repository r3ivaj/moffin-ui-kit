import { useState, useRef, useEffect } from "react";
import { useClickAway } from "react-use";
import { filterOptions } from "../utils/utils";

const useAutocomplete = ({ id, options, value, onChange }) => {
  const [groupedOptions, setGroupedOptions] = useState(options);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setGroupedOptions(filterOptions({ options, searchText: inputValue }));
  }, [inputValue, options]);

  useClickAway(rootRef, () => {
    setOpen(false);
    setFocused(false);
  });

  const getRootProps = () => {
    return {
      ref: rootRef,
      value: inputValue,
      onClick: () => {
        setOpen(true);
        setFocused(true);
        inputRef.current.focus();
      },
    };
  };

  const getInputProps = () => {
    return {
      ref: inputRef,
      value: inputValue,
      onChange: (event) => {
        setOpen(true);
        setInputValue(event.target.value);
      },
    };
  };

  const getPopupIndicatorProps = () => {
    return {
      onClick: (event) => {
        event.stopPropagation();
        setOpen(!open);
        setFocused(true);
        inputRef.current.focus();
      },
    };
  };

  const getListboxProps = () => {
    return {};
  };

  const getOptionProps = ({ option, index }) => {
    return {};
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
    groupedOptions,
  };
};

export default useAutocomplete;
