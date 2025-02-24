import { NumberType } from "@/constants";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const generateUUID = () => crypto.randomUUID();

export const parseError = (error: Error | string | unknown) => {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again later.";
};

export const parseNumber = (value?: string) => {
  return typeof value === "string" && value.length > 0
    ? parseFloat(value)
    : undefined;
};

export const getFormatOptions = (
  type?: NumberType
): Intl.NumberFormatOptions | null => {
  if (!type) return null;

  switch (type) {
    case NumberType.DEFAULT:
      return null;
    case NumberType.PERCENTAGE:
      return { style: "percent" };
    case NumberType.YEARS:
      return { style: "unit", unit: "year" };
    case NumberType.CURRENCY:
      return { style: "currency", currency: "USD" };
  }
};
