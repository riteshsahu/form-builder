import { TextInput } from "@/components/ui";
import { FormService } from "@/lib/form-service";
import { generateUUID } from "@/utils";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QuestionCard } from "./question-card";
import { DEFAULT_FORM_TITLE } from "@/constants";

const defaultQuestion = {
  title: "",
  id: "",
  type: "",
  isRequired: false,
  isHidden: false,
  helperText: "",
  numberType: "",
  min: "",
  max: "",
};

export function FormBuilder({ id }: { id: string }) {
  const [questions, setQuestions] = useState<Array<typeof defaultQuestion>>([]);
  const [formTitle, setFormTitle] = useState<string>(DEFAULT_FORM_TITLE);

  useEffect(() => {
    const saveForm = async () => {
      try {
        await FormService.saveForm({
          title: formTitle,
          questions,
          id,
        });
        //   toast({
        //     title: "Success",
        //     description: "Form saved successfully",
        //   })
      } catch (error) {
        //   toast({
        //     title: "Error",
        //     description: "Failed to save form",
        //     variant: "destructive",
        //   })
      }
    };
    saveForm();
  }, [questions, formTitle, id]);

  const onAddQuestion = () => {
    setQuestions((questions) => [
      ...questions,
      {
        ...defaultQuestion,
        id: generateUUID(),
      },
    ]);
  };

  const onRemoveQuestion = (questionId: string) => {
    setQuestions((questions) => questions.filter((question) => question.id !== questionId));
  };

  const onUpdateQuestion = (questionId: string, data) => {
    setQuestions((questions) =>
      questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            ...data,
          };
        }
        return question;
      })
    );
  };

  return (
    <Box maxWidth={800} mx="auto">
      <Box mb={5}>
        <TextInput
          name="form-title"
          placeholder="Untitled Form"
          value={formTitle}
          onChange={(e) => {
            setFormTitle(e.value);
          }}
        />
      </Box>
      {questions.map((question) => (
        <QuestionCard
          onUpdate={(data) => onUpdateQuestion(question.id, data)}
          key={question.id}
          onRemove={() => onRemoveQuestion(question.id)}
          {...question}
        />
      ))}
      <Button onClick={onAddQuestion}>Add Question</Button>
    </Box>
  );
}
