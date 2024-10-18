import React, { HTMLAttributes, ForwardedRef } from "react";
import { ChevronUpIcon } from "../../assets/icons";

import clsx from "clsx";

interface PopupIndicatorProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  popupOpen: boolean;
  focused: boolean;
}

const PopupIndicator = React.forwardRef(function PopupIndicator(
  { className, popupOpen, focused, ...props }: PopupIndicatorProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      className={clsx(
        "border-0 bg-transparent shadow-none outline-none",
        className,
      )}
      ref={ref}
      {...props}
    >
      <ChevronUpIcon
        className={clsx(
          "transform text-[#6B7280]",
          popupOpen && "rotate-180",
          focused && "text-black",
        )}
      />
    </button>
  );
});

PopupIndicator.displayName = "PopupIndicator";

export default PopupIndicator;
