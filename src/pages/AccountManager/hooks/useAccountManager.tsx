import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterUserMutation } from "../../../store/api/api.ts";
import { FormInputs, InputFields, inputSchema } from "../../../types/form.tsx";
import { userResponseSchema } from "../../../types/user.tsx";

type ErrorData = {
  errors: {
    email?: string;
    username?: string;
  };
};

export function useAccountManager() {
  const path = useLocation().pathname;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [registerUser, { error }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(inputSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    if (path === "/sign-in") {
    }

    if (path === "/sign-up") {
      if (formData.username) {
        const userData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

        const user = {
          user: userData,
        };

        const response = await registerUser(user)
          .then((res) => {
            return userResponseSchema.parse(res);
          })
          .catch((e) => {
            console.log(e);
          });

        if (response) {
          // TODO: Add to the store
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }
    }
  };

  const renderError = () => {
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

  const renderTitle = () => {
    if (path === "/sign-in") {
      return "Sign-in";
    }

    return "Sign-up";
  };

  const renderButtonText = () => {
    if (path === "/sign-in") {
      return "Login";
    }

    return "Create";
  };

  const renderFields = () => {
    let fields: InputFields[] = [];

    if (path === "/sign-in") {
      fields = [
        {
          name: "email",
          id: "email",
          label: "Email Address",
          type: "email",
        },
        {
          name: "password",
          id: "password",
          label: "Password",
          type: "password",
        },
      ];
    }

    if (path === "/sign-up") {
      fields = [
        {
          name: "username",
          id: "username",
          label: "Username",
          type: "text",
        },
        {
          name: "email",
          id: "email",
          label: "Email Address",
          type: "email",
        },
        {
          name: "password",
          id: "password",
          label: "Password",
          type: "password",
        },
        {
          name: "repeatPassword",
          id: "repeatPassword",
          label: "Repeat Password",
          type: "password",
        },
      ];
    }

    return fields;
  };

  const formTitle = renderTitle();
  const buttonText = renderButtonText();
  const inputsFields = renderFields();
  const errorText = renderError();

  return {
    formTitle,
    buttonText,
    inputsFields,
    errorText,
    isShowPassword,
    isValid,
    isSubmitting,
    errors,
    register,
    handleSubmit,
    setIsShowPassword,
    onSubmit,
  } as const;
}
