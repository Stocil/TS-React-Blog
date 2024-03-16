import { FC } from "react";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { FormWrapper } from "./AccountManager.styles.tsx";
import GradientText from "../../components/UIkit/GradientText";

type AuthFields = {
  name: string;
  id: string;
  label: string;
  type?: string;
};

const AccountManager: FC = () => {
  const path = useLocation().pathname;

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
    let fields: AuthFields[] = [];

    if (path === "/sign-in") {
      fields = [
        {
          name: "userName",
          id: "username",
          label: "Username",
          type: "text",
        },
        {
          name: "password",
          id: "password",
          label: "Password",
        },
      ];
    }

    if (path === "/sign-up") {
      fields = [
        {
          name: "userName",
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
        },
        {
          name: "repeatPassword",
          id: "repeatPassword",
          label: "Repeat Password",
        },
      ];
    }

    return fields.map((field) => {
      return (
        <TextField
          key={field.name}
          name={field.name}
          id={field.id}
          label={field.label}
          type={field.type}
          variant={"outlined"}
          autoComplete="off"
          required
          fullWidth
        />
      );
    });
  };

  return (
    <Container
      sx={{
        mt: { xs: 0, sm: 8 },
        pt: "100px",
        height: { xs: "100vh", sm: "calc(100vh - 96px)" },
      }}>
      <Stack direction="row" justifyContent="center">
        <FormWrapper elevation={8}>
          <GradientText variant="h4" textAlign="center">
            {renderTitle()}
          </GradientText>

          <form className="auth__form">
            {renderFields()}

            <Button type="submit" size="large">
              {renderButtonText()}
            </Button>
          </form>
        </FormWrapper>
      </Stack>
    </Container>
  );
};

export default AccountManager;
