import { FC } from "react";
import {
  Button,
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
import Visibility from "@mui/icons-material/Visibility";

import { FormContainer, FormWrapper } from "./AccountManager.styles.tsx";
import GradientText from "../../components/UIkit/GradientText";
import { InputFields } from "../../types/form.tsx";
import { useAccountManager } from "./hooks/useAccountManager.tsx";

const AccountManager: FC = () => {
  const {
    formTitle,
    buttonText,
    inputsFields,
    errorText,
    isShowPassword,
    isValid,
    isSubmitting,
    errors,
    register,
    handleSubmit,
    setIsShowPassword,
    onSubmit,
  } = useAccountManager();

  const renderFields = (fields: InputFields[]) => {
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
                    onClick={() => setIsShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end">
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register(field.name)}
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
          label={field.label}
          variant={"outlined"}
          autoComplete="off"
          required
          fullWidth
          {...register(field.name)}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
        />
      );
    });
  };

  return (
    <FormContainer>
      <Stack direction="row" justifyContent="center">
        <FormWrapper elevation={8}>
          <GradientText variant="h4" textAlign="center">
            {formTitle}
          </GradientText>

          <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
            {renderFields(inputsFields)}

            {errors.root ? (
              <Typography color="error">{errors.root.message}</Typography>
            ) : null}

            {errorText
              ? errorText.map((error) => {
                  return (
                    <Typography key={error} color="error">
                      {error}
                    </Typography>
                  );
                })
              : null}

            <Button
              type="submit"
              size="large"
              disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Loading..." : buttonText}
            </Button>
          </form>
        </FormWrapper>
      </Stack>
    </FormContainer>
  );
};

export default AccountManager;
