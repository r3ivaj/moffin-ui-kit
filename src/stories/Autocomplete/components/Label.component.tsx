import clsx from "clsx";
import React, { HTMLAttributes, ForwardedRef } from "react";

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  moveToTop: boolean;
}

const Label = React.forwardRef(function Label(
  { children, moveToTop, ...props }: LabelProps,
  ref: ForwardedRef<HTMLLabelElement>,
) {
  return (
    <label
      ref={ref}
      className={clsx(
        "pointer-events-none absolute font-normal text-[#6B7280]",
        moveToTop &&
          "left-[10px] top-0 z-[1] -translate-y-1/2 transform rounded-sm bg-white pl-[2px] pr-[2px] text-[12px] leading-4",
        !moveToTop &&
          "left-0 top-1/2 z-[1] mx-4 -translate-y-1/2 transform text-sm",
      )}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;
