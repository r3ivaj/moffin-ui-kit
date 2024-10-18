import React, { HTMLAttributes, ForwardedRef } from "react";
import clsx from "clsx";

interface ListboxProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const Listbox = React.forwardRef(function Listbox(
  { children, className, ...props }: ListboxProps,
  ref: ForwardedRef<HTMLUListElement>,
) {
  return (
    <ul
      className={clsx(
        "absolute top-full z-[1] mx-0 mt-1 flex max-h-72 w-full flex-col gap-1 overflow-auto rounded-lg bg-white p-2 shadow-[0_4px_8px_rgba(64,67,68,0.24)]",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </ul>
  );
});

Listbox.displayName = "Listbox";

export default Listbox;
