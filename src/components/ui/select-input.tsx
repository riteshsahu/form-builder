import type { CollectionItem } from "@chakra-ui/react";
import {
  Select as ChakraSelect,
  createListCollection,
  Field,
  Portal,
} from "@chakra-ui/react";
import * as React from "react";

type SelectTriggerProps = ChakraSelect.ControlProps;

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(props, ref) {
    const { children, ...rest } = props;
    return (
      <ChakraSelect.Control {...rest}>
        <ChakraSelect.Trigger ref={ref}>{children}</ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
    );
  }
);

interface SelectContentProps extends ChakraSelect.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content {...rest} ref={ref} />
        </ChakraSelect.Positioner>
      </Portal>
    );
  }
);

const SelectItem = React.forwardRef<HTMLDivElement, ChakraSelect.ItemProps>(
  function SelectItem(props, ref) {
    const { item, children, ...rest } = props;
    return (
      <ChakraSelect.Item key={item.value} item={item} {...rest} ref={ref}>
        {children}
        <ChakraSelect.ItemIndicator />
      </ChakraSelect.Item>
    );
  }
);

interface SelectValueTextProps
  extends Omit<ChakraSelect.ValueTextProps, "children"> {
  children?(items: CollectionItem[]): React.ReactNode;
}

const SelectValueText = React.forwardRef<HTMLSpanElement, SelectValueTextProps>(
  function SelectValueText(props, ref) {
    const { children, ...rest } = props;
    return (
      <ChakraSelect.ValueText {...rest} ref={ref}>
        <ChakraSelect.Context>
          {(select) => {
            const items = select.selectedItems;
            if (items.length === 0) return props.placeholder;
            if (children) return children(items);
            if (items.length === 1)
              return select.collection.stringifyItem(items[0]);
            return `${items.length} selected`;
          }}
        </ChakraSelect.Context>
      </ChakraSelect.ValueText>
    );
  }
);

const SelectRoot = React.forwardRef<HTMLDivElement, ChakraSelect.RootProps>(
  function SelectRoot(props, ref) {
    return (
      <ChakraSelect.Root
        {...props}
        ref={ref}
        positioning={{ sameWidth: true, ...props.positioning }}
      >
        {props.asChild ? (
          props.children
        ) : (
          <>
            <ChakraSelect.HiddenSelect />
            {props.children}
          </>
        )}
      </ChakraSelect.Root>
    );
  }
) as ChakraSelect.RootComponent;

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  label?: string;
  name?: string;
  value?: string;
  options: Option[];
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const SelectInput = (props: SelectProps) => {
  const {
    label,
    name,
    required,
    options,
    placeholder,
    value,
    helperText,
    errorText,
    optionalText,
    onChange,
    ...rest
  } = props;
  const collection = React.useMemo(
    () => createListCollection({ items: options || [] }),
    [options]
  );

  return (
    <Field.Root required={required} invalid={!!errorText}>
      {label && (
        <Field.Label>
          {label}
          <Field.RequiredIndicator fallback={optionalText} />
        </Field.Label>
      )}
      <SelectRoot
        name={name}
        collection={collection}
        {...(value ? { value: [value] } : null)}
        onValueChange={(item) => {
          if (!onChange) return;
          onChange(item.value[0]);
        }}
        required={required}
        {...rest}
      >
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {collection.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  );
};
