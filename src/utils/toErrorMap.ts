import { ErrorResponse } from '../generated/graphql';

export const toErrorMap = (errors: ErrorResponse[]): Record<string, string> => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
