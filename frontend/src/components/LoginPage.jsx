import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Container, FloatingLabel, Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useAuth from '../hooks';
import routes from '../routes';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(t('login.errors.required')),
      password: yup.string().required(t('login.errors.required')),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);

        auth.logIn(data);
        navigate('/', { replace: true });
      } catch (e) {
        if (e?.response?.status === 401) {
          formik.errors.password = t('login.errors.wrongCredentials');
        } else toast.error(t('errors.networkError'));
      }
    },
  });

  return (
    <Container className="align-items-center">
      <h1>{t('login.title')}</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Stack className="w-50" gap={3}>
          <FloatingLabel controlId="username" label={t('login.form.username')}>
            <Form.Control
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="password" label={t('login.form.password')}>
            <Form.Control
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button variant="outline-primary" type="submit">
            {t('login.form.submit')}
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default LoginPage;
