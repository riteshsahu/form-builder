import { NumberType, QuestionType } from "@/constants";

export interface QuestionSchema {
  id: string;
  title?: string;
  type?: QuestionType;
  isRequired: boolean;
  isParagraph?: boolean;
  defaultValue?: string;
  helperText?: string;
  options?: string[];
  numberType?: NumberType;
  min?: string;
  max?: string;
}

export interface FormSchema {
  id: string;
  title: string;
  questions?: QuestionSchema[];
  createdAt?: Date;
}

export interface FormData {
  [key: string]: string | number;
}

export interface AnswerSchema {
  title?: string;
  value: string;
}

export interface FormResponseSchema {
  id: string;
  formId: string;
  title: string;
  answers?: AnswerSchema[];
  createdAt?: Date;
}

export interface FormSchemaWithResponses {
  id: string;
  title: string;
  questions?: QuestionSchema[];
  createdAt?: Date;
  responses?: FormResponseSchema[];
}
