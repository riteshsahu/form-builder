import {
  Field as ChakraField,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export interface TextAreaInputProps extends Omit<TextareaProps, "onChange"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const TextAreaInput = forwardRef<HTMLDivElement, TextAreaInputProps>(
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
        <Textarea
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
