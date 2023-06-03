import axios from 'axios';
import { useEffect } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../routes';

import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as modalActions } from '../slices/modalSlice';
import socket from '../socket';

import { useTranslation } from 'react-i18next';
import ChannelButton from './ChannelButton';
import { MODAL_TYPES } from './GlobalModal';
import CommentsTab from './MessagesTab';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });

      dispatch(channelsActions.setCurrentChannel(data.currentChannelId));
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messages));
    };

    fetchContent();

    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.updateChannel({ id: payload.id, changes: payload }));
    });
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow-sm">
      <Row className="h-100 bg-white">
        <Col sm={2} className="h-100 p-0">
          <Stack gap={2} className="px-2">
            <Stack direction="horizontal" className="my-3">
              <b className="px-3">{t('chat.channels.title')}</b>
              <Button
                variant="link"
                className="ms-auto p-0"
                onClick={() =>
                  dispatch(
                    modalActions.setModal({
                      isShown: true,
                      modalType: MODAL_TYPES.ADD_CHANNEL_MODAL,
                      extras: {},
                    })
                  )
                }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden">+</span>
              </Button>
            </Stack>

            {channels.map((channel) => (
              <ChannelButton key={channel.id} channel={channel} currentChannel={currentChannel} />
            ))}
          </Stack>
        </Col>
        <Col sm={10} className="h-100 p-0">
          {channels.map(
            (channel) =>
              channel.id === currentChannel && <CommentsTab key={channel.id} channel={channel} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
