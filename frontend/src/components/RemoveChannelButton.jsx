import { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { socket } from "../socket";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const RemoveChannelButton = ({ channel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();

  const onSubmit = () => {
    socket.emit("removeChannel", { id: channel.id }, (response) => {
      if (response.status !== "ok") toast.error(t("errors.networkError"));

      handleClose();
      toast.success(t("chat.modals.removeChannel.success"));
    });
  };

  return (
    <>
      <Dropdown.Item variant="outline-primary" onClick={handleShow}>
        {t("chat.channels.remove")}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("chat.modals.removeChannel.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("chat.modals.removeChannel.body")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("chat.modals.removeChannel.close")}
          </Button>
          <Button variant="danger" onClick={onSubmit}>
            {t("chat.modals.removeChannel.submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannelButton;
