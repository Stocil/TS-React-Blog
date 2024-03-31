import {
  Container,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import FormWrapper from "../../components/UIkit/FormWrapper";
import GradientText from "../../components/UIkit/GradientText";
import { useCreateArticle } from "./hooks/useCreateArticle.tsx";
import { createArticleFields } from "./data/createArticleFields.ts";

const CreateArticle = () => {
  const { onTextAreaBlur, onTextAreaFocus } = useCreateArticle();

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Stack alignItems="center" justifyContent="center">
        <FormWrapper
          sx={{ width: "100%", justifyContent: "start", alignItems: "start" }}>
          <GradientText variant="h4" alignSelf="center">
            Create new article
          </GradientText>

          <form className="create__form">
            {createArticleFields.map((field) => {
              return (
                <TextField
                  key={field.name}
                  id={field.id}
                  label={field.label}
                  variant={"outlined"}
                  autoComplete="off"
                  fullWidth
                />
              );
            })}

            <Stack width={1} position="relative">
              <Typography className="create__textarea-label">Text</Typography>

              <TextareaAutosize
                className="create__textarea"
                onFocus={onTextAreaFocus}
                onBlur={onTextAreaBlur}
              />
            </Stack>
          </form>
        </FormWrapper>
      </Stack>
    </Container>
  );
};

export default CreateArticle;
