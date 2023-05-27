import { useFormik } from "formik";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { socket } from "../socket";
import { selectors } from "../slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { actions as channelsActions } from "../slices/channelsSlice";

const AddChannelButton = ({ setCurrentChannel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const channels = useSelector(selectors.selectAll);

  const formik = useFormik({
    initialValues: { channel: "" },
    validate: ({ channel }) => {
      const errors = {};

      if (!channel) {
        errors.channel = "Required";
      } else if (channels.find(({ name }) => name === channel)) {
        errors.channel = "Channel already exists";
      }

      return errors;
    },
    onSubmit: ({ channel }, actions) => {
      socket.emit("newChannel", { name: channel }, (response) => {
        if (response.status !== "ok") throw new Error("Channel wasn't added");

        actions.resetForm();
        handleClose();
        dispatch(channelsActions.setCurrentChannel(response.data.id));
      });
    },
  });

  return (
    <>
      <Button variant="outline-primary" className="mb-3" onClick={handleShow}>
        Add Channel
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="channel">
              <Form.Label>Channel name</Form.Label>
              <Form.Control
                type="text"
                name="channel"
                value={formik.values.channel}
                onChange={formik.handleChange}
                isInvalid={formik.touched.channel && formik.errors.channel}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.channel}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddChannelButton;
