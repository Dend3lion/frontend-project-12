import { useFormik } from "formik";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { socket } from "../socket";

const getCurrentUser = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return userId && userId.username;
};

const MessageForm = ({ channelId }) => {
  const formik = useFormik({
    initialValues: { message: "" },
    onSubmit: async ({ message }, actions) => {
      socket.emit(
        "newMessage",
        {
          body: message,
          channelId,
          username: getCurrentUser(),
        },
        (response) => {
          if (response.status !== "ok")
            throw new Error("message wasn't send, try again later");

          actions.resetForm();
        }
      );
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="py-3">
      <Row className="g-2">
        <InputGroup className="mb-3">
          <Form.Control
            name="message"
            type="text"
            placeholder="Message"
            value={formik.values.message}
            onChange={formik.handleChange}
            required
          />
          <Button variant="outline-secondary" type="submit">
            Submit
          </Button>
        </InputGroup>
      </Row>
    </Form>
  );
};

export default MessageForm;
