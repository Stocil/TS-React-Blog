import { UpdateInputFields } from "../../../types/form.tsx";

export const useRenderProfileForm = () => {
  const fields: UpdateInputFields[] = [
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
      label: "New Password",
      type: "password",
    },
    {
      name: "image",
      id: "image",
      label: "Image",
      type: "text",
    },
  ];

  return {
    fields,
  } as const;
};
