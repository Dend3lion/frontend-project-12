import axios from "axios";
import { useEffect, useState } from "react";
import routes from "../routes";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from "../slices/channelsSlice";
import { actions as messagesActions } from "../slices/messagesSlice";
import { socket } from "../socket";
import CommentsTab from "./MessagesTab";

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const [currentChannel, setCurrentChannel] = useState(1);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });

      setCurrentChannel(data.currentChannelId);
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messages));
    };

    fetchContent();

    socket.on("newMessage", (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
  }, []);

  return (
    <Container>
      <Tab.Container id="channels" defaultActiveKey={currentChannel}>
        <Row className="py-3">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {channels.map((channel) => (
                <Nav.Item key={channel.id}>
                  <Nav.Link
                    eventKey={channel.id}
                    onClick={() => setCurrentChannel(channel.id)}
                  >
                    {channel.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {channels.map((channel) => (
                <Tab.Pane key={channel.id} eventKey={channel.id}>
                  <CommentsTab channelId={channel.id} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ChatPage;
