import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useEffect } from 'react';
import {
  Button, Form, InputGroup, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { socket } from '../socket';

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
          console.log(response);
          if (response.status !== 'ok') toast.error(t('errors.networkError'));

          actions.resetForm();
        },
      );
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="py-3">
      <Row className="g-2">
        <InputGroup className="mb-3">
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
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('chat.messages.form.submit')}
          </Button>
        </InputGroup>
      </Row>
    </Form>
  );
};

export default MessageForm;
