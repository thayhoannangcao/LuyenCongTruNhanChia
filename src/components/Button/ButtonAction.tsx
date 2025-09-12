import { forwardRef } from 'react';
import Button from './Button';
import type { IButtonProps } from './Button';

const ButtonAction = forwardRef<HTMLButtonElement, Readonly<IButtonProps>>(
  (props, ref) => {
    const { className, ...otherProps } = props;
    return (
      <Button
        ref={ref}
        className={className}
        variant="inherit"
        {...otherProps}
      />
    );
  }
);

ButtonAction.displayName = 'ButtonAction';

export default ButtonAction;
