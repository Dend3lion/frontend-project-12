import { useFormik } from "formik";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { socket } from "../socket";
import { useTranslation } from "react-i18next";

const getCurrentUser = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  return userId && userId.username;
};

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();

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
            throw new Error(t("errors.networkError"));

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
            placeholder={t("chat.messages.form.placeholder")}
            value={formik.values.message}
            onChange={formik.handleChange}
            required
          />
          <Button variant="outline-secondary" type="submit">
            {t("chat.messages.form.submit")}
          </Button>
        </InputGroup>
      </Row>
    </Form>
  );
};

export default MessageForm;
