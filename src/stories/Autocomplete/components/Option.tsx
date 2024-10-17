import React, { HTMLAttributes, ForwardedRef } from "react";
import { UserCircleIcon } from "../../shared/icons";
import CheckIcon from "../../shared/icons/CheckIcon";

import clsx from "clsx";

interface OptionProps extends HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const Option = React.forwardRef(function Option(
  { children, className, ...props }: OptionProps,
  ref: ForwardedRef<HTMLLIElement>,
) {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const iconColor = hovered ? "text-[#1F2937]" : "text-[#6B7280]";
  const textFontWeight = hovered ? "font-semibold" : "font-normal";

  return (
    <li
      className={clsx("flex cursor-pointer items-center px-2 py-1", className)}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <UserCircleIcon className={clsx("mr-2 size-4", iconColor)} />
      <span
        className={clsx(
          "flex-1 text-sm leading-[1.375rem] text-[#1F2937]",
          textFontWeight,
        )}
      >
        {children}
      </span>
      {props["aria-selected"] && (
        <CheckIcon className="size-4 text-[#0E7490]" />
      )}
    </li>
  );
});

Option.displayName = "Option";

export default Option;
