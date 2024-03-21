import { SIGN_IN_URL, SIGN_UP_URL } from "../../../constants";
import { InputFields } from "../../../types/form.tsx";
import { useLocation } from "react-router-dom";

export function useRenderForm() {
  const path = useLocation().pathname;

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
  const tip = renderTip();

  return {
    formTitle,
    buttonText,
    inputsFields,
    tip,
  } as const;
}
