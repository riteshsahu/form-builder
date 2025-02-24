import { delay, generateUUID } from "@/utils";
import type {
  FormResponseSchema,
  FormSchema,
  FormSchemaWithResponses,
  QuestionSchema,
} from "./types";

const DATABASE_NAME = "fb";
const FORM_TABLE_NAME = `${DATABASE_NAME}_forms`;
const RESPONSE_TABLE_NAME = `${DATABASE_NAME}_responses`;

const API_DELAY = 500;

export const FormService = {
  async getAllForms(): Promise<FormSchema[]> {
    await delay(API_DELAY); // Simulate API delay
    const forms = localStorage.getItem(FORM_TABLE_NAME);
    return forms ? JSON.parse(forms) : [];
  },

  async getAllFormsWithResponses(): Promise<FormSchemaWithResponses[]> {
    const forms = await this.getAllForms();
    const responses = await this.getAllResponses();
    return forms.map((form) => ({
      ...form,
      responses: responses.filter((response) => response.formId === form.id),
    }));
  },

  async getFormById(id: string): Promise<FormSchema | null> {
    const forms = await this.getAllForms();
    return forms.find((form) => form.id === id) || null;
  },

  async upsertForm(form: FormSchema): Promise<FormSchema> {
    const forms = await this.getAllForms();
    const existingIndex = forms.findIndex((f) => f.id === form.id);

    if (existingIndex >= 0) {
      forms[existingIndex] = {
        ...forms[existingIndex],
        ...form,
      };
    } else {
      form.createdAt = new Date();
      forms.push(form);
    }

    localStorage.setItem(FORM_TABLE_NAME, JSON.stringify(forms));
    return form;
  },

  async deleteForm(id: string): Promise<void> {
    const forms = await this.getAllForms();
    const updatedForms = forms.filter((form) => form.id !== id);
    localStorage.setItem(FORM_TABLE_NAME, JSON.stringify(updatedForms));
  },

  async upsertQuestion(
    formId: string,
    questionId: string,
    question: QuestionSchema
  ) {
    const form = await this.getFormById(formId);

    if (form) {
      form.questions = form?.questions || [];

      const existingIndex = form.questions.findIndex(
        (q) => q.id === questionId
      );
      if (existingIndex >= 0) {
        form.questions[existingIndex] = question;
      } else {
        form.questions.push(question);
      }
      await this.upsertForm(form);
    }
  },

  async deleteQuestion(formId: string, questionId: string) {
    const form = await this.getFormById(formId);
    if (form) {
      form.questions = form?.questions || [];
      form.questions = form.questions.filter((q) => q.id !== questionId);
      await this.upsertForm(form);
    }
  },
  async getAllResponses(): Promise<FormResponseSchema[]> {
    await delay(API_DELAY); // Simulate API delay
    const responses = localStorage.getItem(`${DATABASE_NAME}_responses`);
    return responses ? JSON.parse(responses) : [];
  },

  async getAllResponsesByFormId(id: string): Promise<FormResponseSchema[]> {
    const responses = await this.getAllResponses();
    return responses.filter((response) => response.formId === id);
  },

  async saveFormResponse(
    response: FormResponseSchema
  ): Promise<FormResponseSchema> {
    const responses = await this.getAllResponses();

    response.id = generateUUID();
    response.createdAt = new Date();
    responses.push(response);

    localStorage.setItem(RESPONSE_TABLE_NAME, JSON.stringify(responses));
    return response;
  },

  async getResponseById(id: string): Promise<FormResponseSchema | null> {
    const responses = await this.getAllResponses();
    return responses.find((response) => response.id === id) || null;
  },
};
