import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useEffect } from 'react';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket from '../socket';

const getCurrentUser = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId && userId.username;
};

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();

  useEffect(() => {
    filter.add(filter.getDictionary('en'));
    filter.add(filter.getDictionary('fr'));
    filter.add(filter.getDictionary('ru'));
  }, []);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }, actions) => {
      socket.emit(
        'newMessage',
        {
          body: filter.clean(body),
          channelId,
          username: getCurrentUser(),
        },
        (response) => {
          if (response.status !== 'ok') toast.error(t('errors.networkError'));

          actions.resetForm();
        }
      );
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="p-3 mt-auto">
      <Row className="g-2">
        <InputGroup>
          <Form.Control
            aria-label={t('chat.messages.form.label')}
            name="body"
            type="text"
            placeholder={t('chat.messages.form.placeholder')}
            value={formik.values.body}
            onChange={formik.handleChange}
            required
            autoFocus
          />
          <Button
            variant="outline-secondary"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
            <span className="visually-hidden"> {t('chat.messages.form.submit')}</span>
          </Button>
        </InputGroup>
      </Row>
    </Form>
  );
};

export default MessageForm;
