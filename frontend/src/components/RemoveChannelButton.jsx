import { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { socket } from "../socket";

const RemoveChannelButton = ({ channel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = () => {
    socket.emit("removeChannel", { id: channel.id }, (response) => {
      if (response.status !== "ok") throw new Error("Channel wasn't removed");

      handleClose();
    });
  };

  return (
    <>
      <Dropdown.Item
        variant="outline-primary"
        className="mb-3"
        onClick={handleShow}
      >
        Remove
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onSubmit}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannelButton;
