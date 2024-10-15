import React, { HTMLAttributes, ForwardedRef } from "react";

const Option = React.forwardRef(function Option(
  props: HTMLAttributes<HTMLLIElement>,
  ref: ForwardedRef<HTMLLIElement>
) {
  return <li ref={ref} {...props} />;
});

Option.displayName = "Option";

export default Option;
