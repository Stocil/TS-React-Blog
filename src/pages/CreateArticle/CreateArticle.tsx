import {
  Button,
  Container,
  Divider,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import FormWrapper from "../../components/UIkit/FormWrapper";
import GradientText from "../../components/UIkit/GradientText";
import {
  DeleteTagButton,
  Tag,
  TagControlWrapper,
} from "./CreateArticle.styled.tsx";

import { createArticleFields } from "./data/createArticleFields.ts";
import { useCreateArticle } from "./hooks/useCreateArticle.tsx";
import ErrorPage from "../ErrorPage";

const CreateArticle = () => {
  const {
    register,
    isSubmitting,
    tags,
    tagInputRef,
    tagInputHelperText,
    addNewTag,
    deleteTag,
    onTextAreaBlur,
    onTextAreaFocus,
    handleSubmit,
    handleSubmitNewArticle,

    articleData,
    slug,
    isAuthor,
    getArticleError,
    isArticleLoading,
  } = useCreateArticle();

  if (slug && (isArticleLoading || getArticleError)) {
    if (isArticleLoading) {
      return <Typography>Loading...</Typography>;
    }

    return <ErrorPage>Article not found</ErrorPage>;
  }

  if (slug && !isArticleLoading && !isAuthor) {
    return <ErrorPage error="403">Forbidden</ErrorPage>;
  }

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Stack alignItems="center" justifyContent="center">
        <FormWrapper
          sx={{ width: "100%", justifyContent: "start", alignItems: "start" }}>
          <GradientText variant="h4" alignSelf="center">
            Create new article
          </GradientText>

          <form
            className="create__form"
            onSubmit={handleSubmit(handleSubmitNewArticle)}>
            {createArticleFields.map((field) => {
              return (
                <TextField
                  key={field.name}
                  id={field.id}
                  label={field.label}
                  variant={"outlined"}
                  autoComplete="off"
                  fullWidth
                  required
                  {...register(field.name)}
                  defaultValue={articleData?.article[field.name]}
                />
              );
            })}

            <Stack width={1} position="relative">
              <Typography className="create__textarea-label">Text</Typography>

              <TextareaAutosize
                id="text"
                style={{ minHeight: 100 }}
                className="create__textarea"
                autoFocus={true}
                onFocus={onTextAreaFocus}
                required
                {...register("body", {
                  onBlur: onTextAreaBlur,
                })}
                defaultValue={articleData?.article.body}
              />
            </Stack>

            <Stack spacing={2} direction="row" flexWrap="wrap" rowGap={1}>
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
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </form>
        </FormWrapper>
      </Stack>
    </Container>
  );
};

export default CreateArticle;
