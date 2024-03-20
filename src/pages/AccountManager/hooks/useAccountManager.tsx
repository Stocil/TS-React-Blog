import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterUserMutation } from "../../../store/api/api.ts";
import { FormInputs, InputFields, inputSchema } from "../../../types/form.tsx";
import { userResponseSchema } from "../../../types/user.tsx";
import { useActions } from "../../../hooks/useActions.ts";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../../constants";

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
  const { registerUser: registerUserAction } = useActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(inputSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    if (path === SIGN_IN_URL) {
    }

    if (path === SIGN_UP_URL) {
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
          localStorage.setItem("user", JSON.stringify(response.data.user));
          registerUserAction(response.data.user);
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
    if (path === SIGN_IN_URL) {
      return "Sign-in";
    }

    return "Sign-up";
  };

  const renderButtonText = () => {
    if (path === SIGN_IN_URL) {
      return "Login";
    }

    return "Create";
  };

  const renderTip = () => {
    if (path === SIGN_IN_URL) {
      return ["Don`t have an account?", "Sign Up"];
    }

    return ["Already have an account?", "Sign In"];
  };

  const renderFields = () => {
    let fields: InputFields[] = [];

    if (path === SIGN_IN_URL) {
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

    if (path === SIGN_UP_URL) {
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
  const tip = renderTip();
  return {
    formTitle,
    buttonText,
    inputsFields,
    errorText,
    tip,
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
