import React from "react";

export default function Button({
  children,
  className = "",
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      className={`rounded-md ${className} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}