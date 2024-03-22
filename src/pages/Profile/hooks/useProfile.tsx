import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LOCAL_STORAGE_USER_KEY } from "../../../constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { useUpdateUserMutation } from "../../../store/api/api.ts";
import { userResponseSchema } from "../../../types/user.tsx";
import { UpdateFormInputs, updateInputSchema } from "../../../types/form.tsx";
import { getErrorMessage } from "../../../utils/getErrorMessage.ts";
import { useActions } from "../../../hooks/useActions.ts";
import { getToken } from "../../../utils/getToken.ts";

export const useProfile = () => {
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [updateUser, { error: updateError }] = useUpdateUserMutation();
  const { updateUser: updateUserAction } = useActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UpdateFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(updateInputSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
    },
  });

  const onSubmit: SubmitHandler<UpdateFormInputs> = async (formData) => {
    const userInfo = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        image: formData.image,
      },
      token: token,
    };

    const response = await updateUser(userInfo)
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
      updateUserAction(response.data.user);
      handleSnackOpen();
    }
  };

  const errorText = getErrorMessage(updateError);

  function handleSnackOpen() {
    setSnackOpen((current) => !current);
  }

  return {
    isSnackOpen,
    isShowPassword,
    isValid,
    isSubmitting,
    errors,
    errorText,
    register,
    handleSubmit,
    handleSnackOpen,
    setIsShowPassword,
    onSubmit,
  } as const;
};
