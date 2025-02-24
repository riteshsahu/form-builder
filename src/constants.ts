import { QuestionSchema } from "@/lib/types";

export enum QuestionType {
  TEXT = "text",
  NUMBER = "number",
  SELECT = "select",
}

export enum NumberType {
  DEFAULT = "default",
  PERCENTAGE = "percentage",
  YEARS = "years",
  CURRENCY = "currency",
}

export const defaultQuestion: QuestionSchema = {
  id: "",
  title: "",
  isRequired: false,
  helperText: "",
  options: [],
};

export const DEFAULT_FORM_TITLE = "Untitled Form";
