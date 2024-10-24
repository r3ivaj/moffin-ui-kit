import React, { HTMLAttributes } from "react";
import clsx from "clsx";

interface RootProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  focused: boolean;
  hovered: boolean;
}

const Root = React.forwardRef<HTMLDivElement, RootProps>(function Root(
  { children, focused, hovered, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex min-w-[312px] items-center rounded-lg border bg-white pr-4",
        hovered && "shadow-[0_4px_8px_rgba(64,67,68,0.24)]",
        !focused && "border-gray-300",
        focused && "border-lightblue-700",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Root.displayName = "Root";

export default Root;
