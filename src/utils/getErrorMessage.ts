import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type FetchError = FetchBaseQueryError | SerializedError | undefined;
type ErrorData = {
  errors: {
    email?: string;
    username?: string;
  };
};

export const getErrorMessage = (error: FetchError) => {
  if (error) {
    if (
      typeof error === "object" &&
      "status" in error &&
      typeof error.status === "number"
    ) {
      const errorData = error?.data as ErrorData;

      if (errorData) {
        return Object.keys(errorData.errors).map(
          (error) =>
            `${error} ${errorData.errors[error as keyof typeof errorData.errors]}`
        );
      }
    }
  }
};
