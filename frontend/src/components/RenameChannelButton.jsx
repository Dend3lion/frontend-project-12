import { useFormik } from "formik";
import { useState } from "react";
import { Button, Dropdown, FloatingLabel, Form, Modal } from "react-bootstrap";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { selectors } from "../slices/channelsSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const RenameChannelButton = ({ channel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);

  const formik = useFormik({
    initialValues: { channelName: channel.name },
    validate: ({ channelName }) => {
      const errors = {};

      if (!channelName) {
        errors.channelName = t("chat.modals.renameChannel.errors.required");
      } else if (channels.find(({ name }) => name === channelName)) {
        errors.channelName = t(
          "chat.modals.renameChannel.errors.channelExists"
        );
      } else if (channelName.length < 3 || channelName.length > 20) {
        errors.channelName = t(
          "chat.modals.renameChannel.errors.channelLength"
        );
      }

      return errors;
    },
    onSubmit: ({ channelName }, actions) => {
      socket.emit(
        "renameChannel",
        { id: channel.id, name: channelName },
        (response) => {
          if (response.status !== "ok") toast.error(t("errors.networkError"));

          handleClose();
          toast.success(t("chat.modals.renameChannel.success"));
        }
      );
    },
  });

  return (
    <>
      <Dropdown.Item
        variant="outline-primary"
        className="mb-3"
        onClick={handleShow}
      >
        {t("chat.channels.rename")}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("chat.modals.renameChannel.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <FloatingLabel
              controlId="channelName"
              label={t("chat.modals.renameChannel.placeholder")}
            >
              <Form.Control
                type="text"
                name="channelName"
                value={formik.values.channelName}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.channelName && formik.errors.channelName
                }
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.channelName}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("chat.modals.renameChannel.close")}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {t("chat.modals.renameChannel.submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameChannelButton;
