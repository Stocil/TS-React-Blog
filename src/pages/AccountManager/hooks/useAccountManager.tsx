import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../../store/api/api.ts";
import { FormInputs, inputSchema } from "../../../types/form.tsx";
import { userResponseSchema } from "../../../types/user.tsx";
import { useActions } from "../../../hooks/useActions.ts";
import {
  LOCAL_STORAGE_USER_KEY,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from "../../../constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type FetchError = FetchBaseQueryError | SerializedError | undefined;
type ErrorData = {
  errors: {
    email?: string;
    username?: string;
  };
};

export function useAccountManager() {
  const path = useLocation().pathname;
  const redirectPath = useLocation().state?.prevPath || "/";
  const navigate = useNavigate();

  const isLogged = !!useTypedSelector((state) => state.user.user.token);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [registerUser, { error: registerError }] = useRegisterUserMutation();
  const [loginUser, { error: loginError }] = useLoginUserMutation();
  const {
    registerUser: registerUserAction,
    logInUser: loginUserAction,
    logOutUser,
  } = useActions();

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(inputSchema),
  });

  useEffect(() => {
    reset();
    clearErrors();
  }, [path, clearErrors, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    if (path === SIGN_IN_URL) {
      const user = {
        user: {
          email: formData.email,
          password: formData.password,
        },
      };

      const response = await loginUser(user)
        .then((res) => {
          return userResponseSchema.parse(res);
        })
        .catch((e) => {
          console.log(e);
        });

      if (response) {
        localStorage.setItem(
          LOCAL_STORAGE_USER_KEY,
          JSON.stringify(response.data.user)
        );
        loginUserAction(response.data.user);
        navigate(redirectPath, { replace: true });
      }
    }

    if (path === SIGN_UP_URL) {
      if (formData.username) {
        const user = {
          user: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        };

        const response = await registerUser(user)
          .then((res) => {
            return userResponseSchema.parse(res);
          })
          .catch((e) => {
            console.log(e);
          });

        if (response) {
          localStorage.setItem(
            LOCAL_STORAGE_USER_KEY,
            JSON.stringify(response.data.user)
          );
          registerUserAction(response.data.user);
          navigate(redirectPath, { replace: true });
        }
      }
    }
  };

  function handleLogOut() {
    logOutUser();
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  const renderError = (error: FetchError) => {
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

  const errorText =
    path === SIGN_IN_URL ? renderError(loginError) : renderError(registerError);

  return {
    path,
    isLogged,
    isShowPassword,
    isValid,
    isSubmitting,
    errors,
    errorText,
    register,
    handleSubmit,
    setIsShowPassword,
    onSubmit,
    handleLogOut,
  } as const;
}
