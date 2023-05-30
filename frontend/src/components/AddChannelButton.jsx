import { useFormik } from "formik";
import { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { socket } from "../socket";
import { selectors } from "../slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { actions as channelsActions } from "../slices/channelsSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddChannelButton = ({ setCurrentChannel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);

  const formik = useFormik({
    initialValues: { channelName: "" },
    validate: ({ channelName }) => {
      const errors = {};

      if (!channelName) {
        errors.channelName = t("chat.modals.addChannel.errors.required");
      } else if (channels.find(({ name }) => name === channelName)) {
        errors.channelName = t("chat.modals.addChannel.errors.channelExists");
      }

      return errors;
    },
    onSubmit: ({ channelName }, actions) => {
      socket.emit("newChannel", { name: channelName }, (response) => {
        if (response.status !== "ok") toast.error(t("errors.networkError"));

        actions.resetForm();
        handleClose();
        dispatch(channelsActions.setCurrentChannel(response.data.id));
        toast.success(t("chat.modals.addChannel.success"));
      });
    },
  });

  return (
    <>
      <Button variant="outline-primary" className="mb-3" onClick={handleShow}>
        {t("chat.channels.add")}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("chat.modals.addChannel.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <FloatingLabel
              controlId="channelName"
              label={t("chat.modals.addChannel.placeholder")}
            >
              <Form.Control
                type="text"
                name="channelName"
                value={formik.values.channelName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            {t("chat.modals.addChannel.close")}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {t("chat.modals.addChannel.submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddChannelButton;
