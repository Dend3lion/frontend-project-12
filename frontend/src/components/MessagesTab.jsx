import { Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';
import MessageForm from './MessageForm';
import cn from 'classnames';

const getCurrentUser = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId && userId.username;
};

const CommentsTab = ({ channel }) => {
  const messages = useSelector(selectors.selectAll);

  return (
    <Stack className="h-100">
      <Stack className="p-3">
        <b>{`# ${channel.name}`}</b>
      </Stack>
      <Stack className="overflow-auto h-100 px-3">
        {messages
          .filter((message) => message.channelId === channel.id)
          .map((message) => {
            const isCurrentUser = message.username === getCurrentUser();

            return (
              <div
                className={cn('m-1', 'px-3', 'py-2', 'bg-light', 'text-dark', {
                  'align-self-end': isCurrentUser,
                  'align-self-start': !isCurrentUser,
                })}>
                <Stack gap={2} key={message.id}>
                  {!isCurrentUser && <div className="fw-semibold fs-6">{message.username}</div>}
                  <div>{message.body}</div>
                </Stack>
              </div>
            );
          })}
      </Stack>
      <MessageForm channelId={channel.id} />
    </Stack>
  );
};

export default CommentsTab;
