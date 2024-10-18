import React, { HTMLAttributes, ForwardedRef } from "react";
import CheckIcon from "../../assets/icons/CheckIcon";

import clsx from "clsx";

interface OptionProps extends HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  startAdornment?: (props: { hovered: boolean }) => React.ReactNode;
}

const Option = React.forwardRef(function Option(
  { children, className, startAdornment, ...props }: OptionProps,
  ref: ForwardedRef<HTMLLIElement>,
) {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const textFontWeight = hovered ? "font-semibold" : "font-normal";

  return (
    <li
      className={clsx("flex cursor-pointer items-center px-2 py-1", className)}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {startAdornment &&
        typeof startAdornment === "function" &&
        startAdornment({ hovered })}
      <span
        className={clsx(
          "flex-1 text-sm leading-[1.375rem] text-slate-900",
          textFontWeight,
        )}
      >
        {children}
      </span>
      {props["aria-selected"] && <CheckIcon className="size-4 text-teal-700" />}
    </li>
  );
});

Option.displayName = "Option";

export default Option;
