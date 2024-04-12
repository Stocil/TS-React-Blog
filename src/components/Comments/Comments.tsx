import { FC } from "react";

import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useComments } from "./hooks/useComments.tsx";
import {
  CommentWrapper,
  InputWrapper,
  SingleCommentUserInfo,
  SingleCommentWrapper,
} from "./Comment.styles.tsx";
import SendIcon from "@mui/icons-material/Send";

const Comments: FC = () => {
  const { user, commentsData, isFetching } = useComments();

  if (isFetching) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={2} mt={4}>
      <Typography variant="h3">Comments</Typography>

      <CommentWrapper>
        <Typography component="p" variant="h6" fontWeight={700}>
          {commentsData?.comments.length} comments
        </Typography>

        {user.token ? (
          <InputWrapper>
            <Avatar src={user?.image} />

            <TextField
              variant={"standard"}
              label="Write your comment"
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SendIcon color="primary" />
                  </IconButton>
                ),
              }}
            />
          </InputWrapper>
        ) : null}

        {commentsData?.comments.map((comment) => {
          return (
            <SingleCommentWrapper key={comment.id}>
              <Avatar src={comment.author.image} />

              <Stack spacing={1}>
                <SingleCommentUserInfo>
                  <Typography fontWeight={700} variant="subtitle1">
                    {comment.author.username}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
                    {comment.createAt}
                  </Typography>
                </SingleCommentUserInfo>

                <Typography>{comment.body}</Typography>
              </Stack>
            </SingleCommentWrapper>
          );
        })}
      </CommentWrapper>
    </Stack>
  );
};

export default Comments;
