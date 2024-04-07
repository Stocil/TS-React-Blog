import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInputs, inputSchema } from "../../../types/form.tsx";
import { userResponseSchema } from "../../../types/user.tsx";
import { useActions } from "../../../hooks/useActions.tsx";
import {
  LOCAL_STORAGE_USER_KEY,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from "../../../constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { getErrorMessage } from "../../../utils/getErrorMessage.ts";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../../store/api/userApi.ts";

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

  const errorText =
    path === SIGN_IN_URL
      ? getErrorMessage(loginError)
      : getErrorMessage(registerError);

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
