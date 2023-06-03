import { useFormik } from 'formik';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';
import socket from '../socket';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    extras: { channelId },
  } = useSelector((state) => state.modal);

  const channels = useSelector(channelsSelectors.selectAll);

  const handleClose = () => {
    dispatch(modalActions.setModal({ isShown: false, modalType: null, extras: {} }));
    formik.handleReset();
    formik.setErrors({});
  };

  const formik = useFormik({
    initialValues: { name: channels.find((channel) => channel.id === channelId).name },
    validate: ({ name }) => {
      const errors = {};

      if (!name) {
        errors.name = t('chat.modals.renameChannel.errors.required');
      } else if (channels.find((item) => item.name === name)) {
        errors.name = t('chat.modals.renameChannel.errors.channelExists');
      } else if (name.length < 3 || name.length > 20) {
        errors.name = t('chat.modals.renameChannel.errors.channelLength');
      }

      return errors;
    },
    onSubmit: ({ name }) => {
      socket.emit('renameChannel', { id: channelId, name }, (response) => {
        if (response.status !== 'ok') toast.error(t('errors.networkError'));

        handleClose();
        toast.success(t('chat.modals.renameChannel.success'));
      });
    },
  });

  return (
    <>
      <Modal show onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('chat.modals.renameChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <FloatingLabel controlId="name" label={t('chat.modals.renameChannel.placeholder')}>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder={t('chat.modals.renameChannel.placeholder')}
                isInvalid={formik.touched.name && formik.errors.name}
                disabled={formik.isSubmitting}
                autoFocus
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.name}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('chat.modals.renameChannel.close')}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {t('chat.modals.renameChannel.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameChannelModal;
