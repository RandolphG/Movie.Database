import React from "react";
import classNames from "classnames";
const cx = classNames;

/**
 * button component
 * @param children
 * @param className
 * @param rest
 * @returns {*}
 * @constructor
 */
export const Button = ({ children, className, ...rest }) => {
  const classNames = cx("button", className);

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};
