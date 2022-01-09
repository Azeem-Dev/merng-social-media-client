import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";

const CommentComponent = ({ username, createdAt, body }) => {
  return (
    <Comment
      author={<a href="#">{username}</a>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt={username} />
      }
      content={<p>{body}</p>}
      datetime={
        <Tooltip title={moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};
export default CommentComponent;
