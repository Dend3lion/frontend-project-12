import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { actions as modalActions } from '../slices/modalSlice';
import socket from '../socket';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    extras: { channelId },
  } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(modalActions.setModal({ isShown: false, modalType: null, extras: {} }));
  };

  const onSubmit = () => {
    socket.emit('removeChannel', { id: channelId }, (response) => {
      if (response.status !== 'ok') toast.error(t('errors.networkError'));

      handleClose();
      toast.success(t('chat.modals.removeChannel.success'));
    });
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('chat.modals.removeChannel.body')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('chat.modals.removeChannel.close')}
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          {t('chat.modals.removeChannel.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
