import { FC } from "react";
import {
  Avatar,
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
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import FormWrapper from "../../components/UIkit/FormWrapper";
import GradientText from "../../components/UIkit/GradientText";
import { AlertSnackbar } from "../../components/UIkit/Snackbar/AlertSnackbar.tsx";
import { UpdateInputFields } from "../../types/form.tsx";
import { useProfile } from "./hooks/useProfile.tsx";
import { useProfileForm } from "./hooks/useProfileForm.tsx";
import { useRenderProfileForm } from "./hooks/useRenderProfileForm.tsx";
import {
  ProfileArticleControl,
  ProfileInner,
  ProfileSwitchButton,
  ProfileWrapper,
} from "./Profile.styles.tsx";
import ArticleList from "../../components/ArticleList";

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
  const { articleOptions, handleChangeProfileArticles } = useProfile();

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
      <ProfileWrapper spacing={5}>
        <ProfileInner>
          <FormWrapper
            elevation={8}
            sx={{ gap: 3, flexGrow: 1, maxWidth: 700 }}>
            <GradientText variant="h4">Profile editing</GradientText>

            <Stack direction="row" spacing={3}>
              <Avatar
                alt="user avatar"
                src="https://i.pinimg.com/originals/69/3e/90/693e90297add0bf805e284ca669e00cd.jpg"
                sx={{ width: 250, height: 250, mt: "30px" }}
              />

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
            </Stack>
          </FormWrapper>
        </ProfileInner>

        <Stack spacing={3}>
          <ProfileArticleControl>
            <ProfileSwitchButton
              size="large"
              onClick={() => handleChangeProfileArticles("user")}>
              My articles
            </ProfileSwitchButton>

            <CompareArrowsIcon fontSize="large" />

            <ProfileSwitchButton
              size="large"
              color="secondary"
              onClick={() => handleChangeProfileArticles("favorited")}>
              Favorite articles
            </ProfileSwitchButton>
          </ProfileArticleControl>

          <ArticleList articleOptions={articleOptions} />
        </Stack>
      </ProfileWrapper>

      <AlertSnackbar open={isSnackOpen} handleClose={handleSnackOpen} />
    </Container>
  );
};

export default Profile;
