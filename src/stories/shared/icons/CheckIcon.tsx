import React from "react";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3.33337 8.66669L6.00004 11.3334L12.6667 4.66669"
        stroke="currentColor" // Cambiado a currentColor
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
