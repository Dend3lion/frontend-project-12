import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, FloatingLabel, Form, Modal, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { actions as channelsActions, selectors } from '../slices/channelsSlice';
import socket from '../socket';

const AddChannelButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);

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
    onSubmit: ({ name }, actions) => {
      socket.emit('newChannel', { name }, (response) => {
        if (response.status !== 'ok') toast.error(t('errors.networkError'));

        handleClose();
        actions.resetForm();
        dispatch(channelsActions.setCurrentChannel(response.data.id));
        toast.success(t('chat.modals.addChannel.success'));
      });
    },
  });

  return (
    <>
      <Stack direction="horizontal" className="my-3">
        <b className="px-3">{t('chat.channels.title')}</b>
        <Button variant="link" className="ms-auto p-0" onClick={handleShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </Stack>
      <Modal show={show} onHide={handleClose}>
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
                autoFocus
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('chat.modals.addChannel.close')}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {t('chat.modals.addChannel.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddChannelButton;
