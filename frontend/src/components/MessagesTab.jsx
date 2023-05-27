import { useSelector } from "react-redux";
import { selectors } from "../slices/messagesSlice";
import { Stack } from "react-bootstrap";
import MessageForm from "./MessageForm";

const getCurrentUser = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return userId && userId.username;
};

const CommentsTab = ({ channelId }) => {
  const messages = useSelector(selectors.selectAll);

  return (
    <div>
      <Stack>
        {messages
          .filter((message) => message.channelId === channelId)
          .map((message) => {
            const isCurrentUser = message.username === getCurrentUser();

            return (
              <Stack
                gap={2}
                key={message.id}
                className={`m-1 px-3 py-2 bg-light text-dark ${
                  isCurrentUser ? "align-self-end" : "align-self-start"
                }`}
              >
                {!isCurrentUser && (
                  <div className="fw-semibold fs-6">{message.username}</div>
                )}
                <div>{message.body}</div>
              </Stack>
            );
          })}
      </Stack>
      <MessageForm channelId={channelId} />
    </div>
  );
};

export default CommentsTab;
