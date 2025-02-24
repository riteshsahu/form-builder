import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import * as React from "react";

export interface CheckboxProps
  extends Omit<ChakraCheckbox.RootProps, "onChange"> {
  icon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.Ref<HTMLLabelElement>;
  onChange?: (value: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, name, onChange, rootRef, ...rest } =
      props;
    return (
      <ChakraCheckbox.Root
        name={name}
        ref={rootRef}
        {...rest}
        onCheckedChange={(e) => {
          if (!onChange) return;
          onChange(e.checked as boolean);
        }}
      >
        <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
        <ChakraCheckbox.Control>
          {icon || <ChakraCheckbox.Indicator />}
        </ChakraCheckbox.Control>
        {children != null && (
          <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
        )}
      </ChakraCheckbox.Root>
    );
  }
);
