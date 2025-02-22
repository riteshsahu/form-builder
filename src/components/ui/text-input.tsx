import { ValueChange } from "@/lib/types";
import { Field as ChakraField, Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface TextInputProps extends Omit<InputProps, "onChange"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  onChange?: (e: ValueChange) => void;
}

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(function Field(props, ref) {
  const { name, label, onChange, helperText, errorText, optionalText, ...rest } = props;
  return (
    <ChakraField.Root ref={ref}>
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      <Input
        name={name}
        {...rest}
        onChange={(e) => {
          if (!onChange) return;
          onChange({
            name,
            value: e.target.value,
          });
        }}
      />
      {helperText && <ChakraField.HelperText>{helperText}</ChakraField.HelperText>}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});
