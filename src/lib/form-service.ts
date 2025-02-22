import type { FormSchema } from "./types";

const STORAGE_KEY = "forms";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const FormService = {
  async getAllForms(): Promise<FormSchema[]> {
    await delay(500); // Simulate API delay
    const forms = localStorage.getItem(STORAGE_KEY);
    return forms ? JSON.parse(forms) : [];
  },

  async getFormById(id: string): Promise<FormSchema | null> {
    await delay(300);
    const forms = await this.getAllForms();
    return forms.find((form) => form.id === id) || null;
  },

  async saveForm(form: FormSchema): Promise<FormSchema> {
    await delay(300);
    const forms = await this.getAllForms();
    const existingIndex = forms.findIndex((f) => f.id === form.id);

    if (existingIndex >= 0) {
      forms[existingIndex] = form;
    } else {
      form.createdAt = new Date();
      forms.push(form);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
    return form;
  },

  async deleteForm(id: string): Promise<void> {
    await delay(300);
    const forms = await this.getAllForms();
    const updatedForms = forms.filter((form) => form.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
  },
};
