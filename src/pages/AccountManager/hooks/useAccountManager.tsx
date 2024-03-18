import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, InputFields, inputSchema } from "../../../types";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export function useAccountManager() {
  const path = useLocation().pathname;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(inputSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (path === "/sign-in") {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        throw new Error();
      } catch (error) {
        setError("root", {
          message: "Invalid username or password",
        });
      }
    }

    if (path === "/sign-up") {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        throw new Error();
      } catch (error) {
        setError("username", {
          message: "This username is already taken",
        });
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
          name: "username",
          id: "username",
          label: "Username",
          type: "text",
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
