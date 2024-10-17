import React, { InputHTMLAttributes, ForwardedRef } from "react";
import clsx from "clsx";

const Input = React.forwardRef(function Input(
  { className, ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      className={clsx(
        "flex-1 rounded-[inherit] border-none bg-inherit px-4 py-2 text-sm text-black outline-0",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
