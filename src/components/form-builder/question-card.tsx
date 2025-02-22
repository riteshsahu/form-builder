import { Checkbox, NumberInput, SelectInput, TextInput } from "@/components/ui";
import { NumberType, QuestionType } from "@/constants";
import useToggle from "@/hooks/useToggle";
import { ValueChange } from "@/lib/types";
import { capitalize } from "@/utils";
import {
  Box,
  Button,
  Card,
  Collapsible,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuChevronDown, LuTrash } from "react-icons/lu";

const questionOptions = Object.values(QuestionType).map((type) => ({
  value: type,
  label: capitalize(type),
}));

const numberOptions = Object.values(NumberType).map((type) => ({
  value: type,
  label: capitalize(type),
}));

export function QuestionCard({ onRemove, onUpdate, ...rest }) {
  const [isOpen, onToggle] = useToggle(true);
  const [selectTypeOptions, setSelectTypeOptions] = useState<string[]>([]);

  useEffect(() => {
    onUpdate({
      options: selectTypeOptions.map((option) => ({
        label: option,
        value: option,
      })),
    });
  }, [selectTypeOptions, onUpdate]);

  const onChange = (e: ValueChange<string | boolean>) => {
    const { name, value } = e;
    console.log({ name, value });

    if (name) {
      onUpdate({ [name]: value });
    }
  };

  return (
    <Box padding={5}>
      <Collapsible.Root open={isOpen} onOpenChange={onToggle}>
        <Card.Root size={"sm"}>
          <Card.Body cursor={isOpen ? "default" : "pointer"}>
            <Collapsible.Trigger asChild>
              <HStack>
                <Box flex="1" onClick={(e) => e.stopPropagation()}>
                  {isOpen ? (
                    <TextInput
                      label="Question Title"
                      name="title"
                      placeholder="Enter Question Title"
                      value={rest.title}
                      onChange={onChange}
                    />
                  ) : (
                    <Text>{rest.title}</Text>
                  )}
                </Box>
                <HStack mt={isOpen ? "26px" : 0} transition={"all .2s"}>
                  <IconButton
                    onClick={onRemove}
                    variant={"ghost"}
                    colorPalette={"red"}
                  >
                    <LuTrash />
                  </IconButton>
                  <IconButton
                    cursor={"pointer"}
                    variant={"plain"}
                    rotate={isOpen ? "180deg" : "0deg"}
                    transition={"all .2s"}
                  >
                    <LuChevronDown />
                  </IconButton>
                </HStack>
              </HStack>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Stack mt={4} gap={4}>
                <HStack alignItems={"center"} gap={5}>
                  <SelectInput
                    label="Question Type"
                    placeholder="Select Type"
                    name="type"
                    options={questionOptions}
                    value={rest.type}
                    onChange={onChange}
                  />

                  <HStack mt="26px" gap={6}>
                    <Checkbox
                      name="isRequired"
                      checked={rest.isRequired}
                      onChange={onChange}
                    >
                      Required
                    </Checkbox>
                    <Checkbox
                      name="isHidden"
                      checked={rest.isHidden}
                      onChange={onChange}
                    >
                      Hidden
                    </Checkbox>
                  </HStack>
                </HStack>
                <TextInput
                  label="Helper Text"
                  name="helperText"
                  placeholder="Enter Helper Text"
                  helperText="Additional Instructions (optional)"
                  value={rest.helperText}
                  onChange={onChange}
                />
                {rest.type === QuestionType.TEXT && (
                  <Checkbox
                    name="isParagraph"
                    checked={rest.isParagraph}
                    onChange={onChange}
                  >
                    Is Paragraph?
                  </Checkbox>
                )}
                {rest.type === QuestionType.NUMBER && (
                  <HStack gap={4}>
                    <SelectInput
                      label="Number Type"
                      name="numberType"
                      options={numberOptions}
                      value={rest.numberType}
                      onChange={onChange}
                    />

                    <NumberInput
                      label="Min"
                      name="min"
                      value={rest.min}
                      placeholder="Enter Min"
                      onChange={onChange}
                    />
                    <NumberInput
                      label="Max"
                      name="max"
                      value={rest.max}
                      placeholder="Enter Max"
                      onChange={onChange}
                    />
                  </HStack>
                )}
                {rest.type === QuestionType.SELECT && (
                  <VStack gap={4}>
                    {selectTypeOptions.map((option, optionIndex) => (
                      <TextInput
                        key={optionIndex}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...selectTypeOptions];
                          newOptions[optionIndex] = e.value;
                          setSelectTypeOptions(newOptions);
                        }}
                      />
                    ))}
                    <Button
                      alignSelf="flex-end"
                      onClick={() =>
                        setSelectTypeOptions([...selectTypeOptions, ""])
                      }
                    >
                      Add Option
                    </Button>
                  </VStack>
                )}
              </Stack>
            </Collapsible.Content>
          </Card.Body>
        </Card.Root>
      </Collapsible.Root>
    </Box>
  );
}
