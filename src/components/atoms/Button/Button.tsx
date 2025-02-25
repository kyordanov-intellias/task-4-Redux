import React, { FC } from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
