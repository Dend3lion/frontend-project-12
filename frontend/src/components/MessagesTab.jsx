import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { selectors } from '../slices/messagesSlice';
import MessageForm from './MessageForm';

const CommentsTab = ({ channel }) => {
  const { getCurrentUser } = useAuth();
  const messages = useSelector(selectors.selectAll);
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.lastChild?.scrollIntoView(false);
  }, [messages]);

  return (
    <Stack className="h-100">
      <Stack className="p-3">
        <b>{`# ${channel.name}`}</b>
      </Stack>
      <Stack ref={messageRef} id="messages-box" className="overflow-auto h-100 px-3">
        {messages
          .filter((message) => message.channelId === channel.id)
          .map((message) => {
            const isCurrentUser = message.username === getCurrentUser()?.username;

            return (
              <div
                key={message.id}
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
