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
    initialValues: { name: channel.name },
    validate: ({ name }) => {
      const errors = {};

      if (!name) {
        errors.name = t("chat.modals.renameChannel.errors.required");
      } else if (channels.find((channel) => channel.name === name)) {
        errors.name = t("chat.modals.renameChannel.errors.channelExists");
      } else if (name.length < 3 || name.length > 20) {
        errors.name = t("chat.modals.renameChannel.errors.channelLength");
      }

      return errors;
    },
    onSubmit: ({ name }, actions) => {
      socket.emit(
        "renameChannel",
        { id: channel.id, name: name },
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
      <Dropdown.Item variant="outline-primary" onClick={handleShow}>
        {t("chat.channels.rename")}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("chat.modals.renameChannel.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <FloatingLabel
              controlId="name"
              label={t("chat.modals.renameChannel.placeholder")}
            >
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                isInvalid={formik.touched.name && formik.errors.name}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
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
