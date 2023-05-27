import { useFormik } from "formik";
import { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { selectors } from "../slices/channelsSlice";

const RenameChannelButton = ({ channel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const channels = useSelector(selectors.selectAll);

  const formik = useFormik({
    initialValues: { channelName: channel.name },
    validate: ({ channelName }) => {
      const errors = {};

      if (!channelName) {
        errors.channelName = "Required";
      } else if (channels.find(({ name }) => name === channelName)) {
        errors.channelName = "Channel already exists";
      }

      return errors;
    },
    onSubmit: ({ channelName }, actions) => {
      socket.emit(
        "renameChannel",
        { id: channel.id, name: channelName },
        (response) => {
          if (response.status !== "ok")
            throw new Error("Channel wasn't renamed");

          handleClose();
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
        Rename
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="channelName">
              <Form.Label>Channel name</Form.Label>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameChannelButton;
