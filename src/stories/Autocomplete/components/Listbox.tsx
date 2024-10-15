import React, { HTMLAttributes, ForwardedRef } from "react";

const Listbox = React.forwardRef(function Listbox(
  props: HTMLAttributes<HTMLUListElement>,
  ref: ForwardedRef<HTMLUListElement>
) {
  return <ul ref={ref} {...props} />;
});

export default Listbox;
