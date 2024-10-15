import React, { InputHTMLAttributes, ForwardedRef } from "react";

const Input = React.forwardRef(function Input(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input ref={ref} {...props} />;
});

export default Input;
