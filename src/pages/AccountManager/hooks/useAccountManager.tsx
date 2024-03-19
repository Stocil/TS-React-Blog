import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterUserMutation } from "../../../store/api/api.ts";
import { FormInputs, InputFields, inputSchema } from "../../../types";
import { userResponseSchema } from "../../../types/user.tsx";

export function useAccountManager() {
  const path = useLocation().pathname;
  const [isShowPassword, setIsShowPassword] = useState(false);

  // TODO Add loading, set error in root error
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(inputSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    if (path === "/sign-in") {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(formData);
        throw new Error();
      } catch (error) {
        setError("root", {
          message: "Invalid username or password",
        });
      }
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
            console.log(e.issues);
          });

        if (response) {
          console.log(response.data.user);
        }
      }
    }
  };
  if (error) {
    if ("status" in error) {
      const errorMessage =
        "error" in error ? error.error : JSON.stringify(error.data);
      console.log(errorMessage);
    }
  }

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

  return {
    formTitle,
    buttonText,
    inputsFields,
    isShowPassword,
    register,
    errors,
    isValid,
    isSubmitting,
    handleSubmit,
    setIsShowPassword,
    onSubmit,
  } as const;
}
