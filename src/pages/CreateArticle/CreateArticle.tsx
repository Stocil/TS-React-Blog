import {
  Button,
  Container,
  Divider,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import FormWrapper from "../../components/UIkit/FormWrapper";
import GradientText from "../../components/UIkit/GradientText";
import { useCreateArticle } from "./hooks/useCreateArticle.tsx";
import { createArticleFields } from "./data/createArticleFields.ts";
import {
  DeleteTagButton,
  Tag,
  TagControlWrapper,
} from "./CreateArticle.styled.tsx";
import CloseIcon from "@mui/icons-material/Close";

const CreateArticle = () => {
  const {
    onTextAreaBlur,
    onTextAreaFocus,
    tags,
    tagInputRef,
    tagInputHelperText,
    addNewTag,
    deleteTag,
  } = useCreateArticle();

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
                id="text"
                name="text"
                style={{ minHeight: 100 }}
                className="create__textarea"
                onFocus={onTextAreaFocus}
                onBlur={onTextAreaBlur}
              />
            </Stack>

            <Stack spacing={1} direction="row">
              {tags.map((tag) => {
                return (
                  <Stack key={tag} direction="row" spacing={1}>
                    <Tag>{tag}</Tag>

                    <DeleteTagButton
                      disableRipple
                      onClick={() => deleteTag(tag)}>
                      <CloseIcon color="error" />
                    </DeleteTagButton>

                    <Divider orientation="vertical" />
                  </Stack>
                );
              })}
            </Stack>

            <TagControlWrapper>
              <TextField
                inputRef={tagInputRef}
                label="Tag"
                variant={"outlined"}
                autoComplete="off"
                helperText={tagInputHelperText}
                error={!!tagInputHelperText}
              />

              <Button size="large" onClick={addNewTag}>
                Add tag
              </Button>
            </TagControlWrapper>

            <Button
              sx={{ alignSelf: "center", px: 3, py: 1 }}
              variant="gradient"
              size="large"
              type="submit">
              Submit
            </Button>
          </form>
        </FormWrapper>
      </Stack>
    </Container>
  );
};

export default CreateArticle;
