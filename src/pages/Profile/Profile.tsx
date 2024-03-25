import { FC } from "react";
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
import Visibility from "@mui/icons-material/Visibility";

import FormWrapper from "../../components/UIkit/FormWrapper";
import GradientText from "../../components/UIkit/GradientText";
import { AlertSnackbar } from "../../components/UIkit/Snackbar/AlertSnackbar.tsx";
import { UpdateInputFields } from "../../types/form.tsx";
import { useProfile } from "./hooks/useProfile.tsx";
import { useProfileForm } from "./hooks/useProfileForm.tsx";
import { useRenderProfileForm } from "./hooks/useRenderProfileForm.tsx";
import { ArticleAuthorData } from "../../components/ArticleAuthorData/ArticleAuthorData.tsx";
import { ErrorMessage } from "../../components/UIkit/ErrorMessage/ErrorMessage.tsx";
import {
  FollowingWrapper,
  ProfileInner,
  ProfileWrapper,
} from "./Profile.styles.tsx";

const Profile: FC = () => {
  const {
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
  } = useProfileForm();
  const { fields } = useRenderProfileForm();
  const { followingUsers } = useProfile();

  const renderFields = (fields: UpdateInputFields[]) => {
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
          fullWidth
          {...register(field.name)}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
        />
      );
    });
  };

  return (
    <Container>
      <ProfileWrapper>
        <ProfileInner>
          <Stack spacing={3} textAlign="center">
            <GradientText variant="h4">Following authors</GradientText>

            <FollowingWrapper>
              {followingUsers[0] ? (
                followingUsers.map((user) => {
                  return (
                    <ArticleAuthorData
                      key={user.username}
                      author={user}
                      isFollow={true}
                    />
                  );
                })
              ) : (
                <ErrorMessage variant="h5">There no authors yet</ErrorMessage>
              )}
            </FollowingWrapper>
          </Stack>

          <FormWrapper elevation={8} sx={{ gap: 3, flexGrow: 1 }}>
            <GradientText variant="h4">Editing a profile</GradientText>

            <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
              {renderFields(fields)}

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
                {isSubmitting ? "Loading..." : "Save"}
              </Button>
            </form>
          </FormWrapper>
        </ProfileInner>
      </ProfileWrapper>

      <AlertSnackbar open={isSnackOpen} handleClose={handleSnackOpen} />
    </Container>
  );
};

export default Profile;
