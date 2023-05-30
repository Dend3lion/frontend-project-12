import axios from "axios";
import { useEffect } from "react";
import routes from "../routes";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Row,
  Stack,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from "../slices/channelsSlice";
import { actions as messagesActions } from "../slices/messagesSlice";
import { socket } from "../socket";
import CommentsTab from "./MessagesTab";
import AddChannelButton from "./AddChannelButton";
import RenameChannelButton from "./RenameChannelButton";
import RemoveChannelButton from "./RemoveChannelButton";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector(
    (state) => state.channels.currentChannelId
  );
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

    socket.on("newMessage", (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    socket.on("newChannel", (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });

    socket.on("removeChannel", (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
    });

    socket.on("renameChannel", (payload) => {
      dispatch(
        channelsActions.updateChannel({ id: payload.id, changes: payload })
      );
    });

    socket.on("connect_error", () => {
      toast.error(t("errors.connectionLost"));
    });
  }, []);

  return (
    <Container>
      <Row className="py-3">
        <Col sm={2}>
          <Stack gap={2}>
            <AddChannelButton />

            {channels.map((channel) => (
              <Dropdown key={channel.id} as={ButtonGroup} className="w-100">
                <Button
                  variant={channel.id === currentChannel ? "primary" : "light"}
                  onClick={() =>
                    dispatch(channelsActions.setCurrentChannel(channel.id))
                  }
                  className="text-truncate text-start"
                >
                  # {channel.name}
                </Button>

                {channel.removable && (
                  <Dropdown.Toggle
                    split
                    variant={
                      channel.id === currentChannel ? "primary" : "light"
                    }
                    id="addChannelOptions"
                    className="flex-grow-0"
                  />
                )}

                <Dropdown.Menu>
                  <RenameChannelButton channel={channel} />
                  <RemoveChannelButton channel={channel} />
                </Dropdown.Menu>
              </Dropdown>
            ))}
          </Stack>
        </Col>
        <Col sm={10}>
          {channels.map(
            (channel) =>
              channel.id === currentChannel && (
                <CommentsTab key={channel.id} channelId={channel.id} />
              )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
