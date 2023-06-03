import { useFormik } from 'formik';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';
import socket from '../socket';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);

  const handleClose = () => {
    dispatch(modalActions.setModal({ isShown: false, modalType: null, extras: {} }));
    formik.handleReset();
    formik.setErrors({});
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validate: ({ name }) => {
      const errors = {};

      if (!name) {
        errors.name = t('chat.modals.addChannel.errors.required');
      } else if (channels.find((channel) => channel.name === name)) {
        errors.name = t('chat.modals.addChannel.errors.channelExists');
      } else if (name.length < 3 || name.length > 20) {
        errors.name = t('chat.modals.addChannel.errors.channelLength');
      }

      return errors;
    },
    onSubmit: ({ name }) => {
      socket.emit('newChannel', { name }, (response) => {
        if (response.status !== 'ok') return toast.error(t('errors.networkError'));

        handleClose();
        dispatch(channelsActions.setCurrentChannel(response.data.id));
        toast.success(t('chat.modals.addChannel.success'));
      });
    },
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="name" label={t('chat.modals.addChannel.placeholder')}>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              placeholder={t('chat.modals.addChannel.placeholder')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          {t('chat.modals.addChannel.close')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
          {t('chat.modals.addChannel.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
