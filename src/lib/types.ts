export type FormElementType = "text" | "number" | "select";

export interface QuestionSchema {
  id: string;
  type: FormElementType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface FormSchema {
  id: string;
  title: string;
  questions: QuestionSchema[];
  createdAt?: Date;
}

export interface FormData {
  [key: string]: string | number;
}

export interface ValueChange<T = string> {
  name?: string;
  value: T;
}
