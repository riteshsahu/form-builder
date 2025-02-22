import { ValueChange } from "@/lib/types";
import { NumberInput as ChakraNumberInput, Field } from "@chakra-ui/react";
import * as React from "react";

interface NumberInputProps
  extends Omit<ChakraNumberInput.RootProps, "onChange"> {
  label?: React.ReactNode;
  placeholder?: string;
  onChange?: (e: ValueChange) => void;
}

export const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  function NumberInput(props, ref) {
    const { label, name, placeholder, onChange, ...rest } = props;
    return (
      <Field.Root>
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
              onChange({
                name,
                value: e.value,
              });
            }
          }}
        >
          <ChakraNumberInput.Input placeholder={placeholder} />
          <ChakraNumberInput.Control>
            <ChakraNumberInput.IncrementTrigger />
            <ChakraNumberInput.DecrementTrigger />
          </ChakraNumberInput.Control>
        </ChakraNumberInput.Root>
      </Field.Root>
    );
  }
);
