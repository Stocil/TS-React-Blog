import { FC } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  CommentWrapper,
  InputWrapper,
  SingleCommentUserInfo,
  SingleCommentWrapper,
} from "./Comment.styles.tsx";
import { useComments } from "./hooks/useComments.tsx";
import { AUTHOR_PAGE_URL } from "../../constants";
import { LoadingComments } from "../Loading";

const Comments: FC = () => {
  const {
    user,
    commentsData,
    isFetching,
    commentInputRef,
    handleCreateComment,
  } = useComments();

  if (isFetching) {
    return <LoadingComments />;
  }

  return (
    <Stack spacing={2} mt={4}>
      <Typography variant="h4">Comments</Typography>

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
                  <IconButton onClick={handleCreateComment}>
                    <SendIcon color="primary" />
                  </IconButton>
                ),
              }}
              inputRef={commentInputRef}
            />
          </InputWrapper>
        ) : null}

        {commentsData?.comments.map((comment) => {
          return (
            <SingleCommentWrapper key={comment.id}>
              <Link to={`${AUTHOR_PAGE_URL}/${comment.author.username}`}>
                <Avatar src={comment.author.image} />
              </Link>

              <Stack spacing={1}>
                <SingleCommentUserInfo>
                  <Typography fontWeight={700} variant="subtitle1">
                    {comment.author.username}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
                    {comment.createAt}
                  </Typography>
                </SingleCommentUserInfo>

                <Typography sx={{ wordBreak: "break-all" }}>
                  {comment.body}
                </Typography>
              </Stack>
            </SingleCommentWrapper>
          );
        })}
      </CommentWrapper>
    </Stack>
  );
};

export default Comments;
