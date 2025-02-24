import { NumberInput as ChakraNumberInput, Field } from "@chakra-ui/react";
import * as React from "react";

interface NumberInputProps
  extends Omit<ChakraNumberInput.RootProps, "onChange"> {
  label?: React.ReactNode;
  placeholder?: string;
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  function NumberInput(props, ref) {
    const {
      label,
      name,
      placeholder,
      min,
      max,
      onChange,
      required,
      errorText,
      helperText,
      ...rest
    } = props;
    return (
      <Field.Root invalid={!!errorText} required={required} maxW="fit-content">
        <Field.Label>
          {label}
          <Field.RequiredIndicator />
        </Field.Label>
        <ChakraNumberInput.Root
          ref={ref}
          variant="outline"
          maxW="200px"
          name={name}
          {...rest}
          onValueChange={(e) => {
            if (onChange) {
              onChange(e.value);
            }
          }}
        >
          <ChakraNumberInput.Input
            placeholder={placeholder}
            min={min}
            max={max}
          />
          <ChakraNumberInput.Control>
            <ChakraNumberInput.IncrementTrigger />
            <ChakraNumberInput.DecrementTrigger />
          </ChakraNumberInput.Control>
        </ChakraNumberInput.Root>

        {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
        {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      </Field.Root>
    );
  }
);
