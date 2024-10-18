import React from "react";

interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M15.8333 7.50002L10 13.3333L4.16667 7.50002"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDownIcon;
