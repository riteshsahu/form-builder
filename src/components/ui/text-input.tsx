import { Field as ChakraField, Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface TextInputProps extends Omit<InputProps, "onChange"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  function Field(props, ref) {
    const {
      name,
      label,
      onChange,
      helperText,
      errorText,
      optionalText,
      required,
      ...rest
    } = props;
    return (
      <ChakraField.Root ref={ref} invalid={!!errorText} required={required}>
        {label && (
          <ChakraField.Label>
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
        <Input
          name={name}
          onChange={(e) => {
            if (!onChange) return;
            onChange(e.target.value);
          }}
          {...rest}
        />
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);
