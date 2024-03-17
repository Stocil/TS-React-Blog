import { FC, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FormWrapper } from "./AccountManager.styles.tsx";
import GradientText from "../../components/UIkit/GradientText";
import { Visibility } from "@mui/icons-material";

type InputFields = {
  name: "username" | "email" | "password" | "repeatPassword";
  id: string;
  label: string;
  type?: string;
};

type FormInputs = {
  username: string;
  email?: string;
  password: string;
  repeatPassword?: string;
};

// TODO Full refactor!!

const AccountManager: FC = () => {
  const path = useLocation().pathname;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onBlur" });

  console.log(errors);

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

    return fields.map((field) => {
      if (field.type === "password") {
        return (
          <FormControl key={field.name} sx={{ width: 1 }} variant="outlined">
            <InputLabel
              color={errors[field.name]?.message ? "error" : "primary"}
              htmlFor={field.name}>
              {field.label}
            </InputLabel>

            <OutlinedInput
              error={!!errors[field.name]?.message}
              type={isShowPassword ? "text" : "password"}
              id={field.id}
              label={field.label}
              autoComplete="off"
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end">
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register(field.name, {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password is too short",
                },
                validate: {
                  isMatch: (value) => {
                    if (field.name === "repeatPassword") {
                      return (
                        value === watch("password") || "Passwords do not match"
                      );
                    }
                  },
                },
              })}
            />

            {errors[field.name] ? (
              <Typography variant="body2" color="error">
                {errors[field.name]?.message}
              </Typography>
            ) : null}
          </FormControl>
        );
      }

      return (
        <TextField
          key={field.name}
          id={field.id}
          type={field.type}
          label={field.label}
          variant={"outlined"}
          autoComplete="off"
          required
          fullWidth
          {...register(field.name, {
            required: `${field.label} is required`,
            minLength: {
              value: 4,
              message: `${field.label} is too short`,
            },
          })}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
        />
      );
    });
  };

  const onSubmit = (data: FormInputs) => {
    console.log(data);
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

          <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
            {renderFields()}

            <Button type="submit" size="large" disabled={!isValid}>
              {renderButtonText()}
            </Button>
          </form>
        </FormWrapper>
      </Stack>
    </Container>
  );
};

export default AccountManager;
