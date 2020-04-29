import React, { forwardRef } from "react";
import classNames from "classnames";
const cx = classNames;

/**
 *
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly children?: *, readonly className?: *, readonly as?: *}> & React.RefAttributes<unknown>>}
 */
export const Container = forwardRef(
  ({ className, as: Component, children, ...props }, ref) => {
    const classNames = cx("container", className);
    return (
      <Component className={classNames} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
