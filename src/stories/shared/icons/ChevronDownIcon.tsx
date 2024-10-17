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
        d="M4.16665 12.5L9.99998 6.66667L15.8333 12.5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDownIcon;
