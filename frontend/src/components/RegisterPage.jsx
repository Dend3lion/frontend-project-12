import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Container, FloatingLabel, Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useAuth from '../hooks';
import routes from '../routes';

const RegisterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required(t('register.errors.required'))
        .min(3, t('register.errors.usernameLength'))
        .max(20, t('register.errors.usernameLength')),
      password: yup
        .string()
        .required(t('register.errors.required'))
        .min(6, t('register.errors.passwordLength')),
      passwordConfirmation: yup
        .string()
        .required(t('register.errors.required'))
        .oneOf([yup.ref('password'), null], t('register.errors.passwordMatch')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.signUpPath(), {
          username,
          password,
        });

        auth.logIn(data);
        navigate('/', { replace: true });
      } catch (e) {
        if (e?.response?.status === 409)
          formik.errors.passwordConfirmation = t('register.errors.userExists');
        else toast.error(t('errors.networkError'));

        console.log(e);
      }
    },
  });

  return (
    <Container className="align-items-center">
      <h1>{t('register.title')}</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Stack className="w-50" gap={3}>
          <FloatingLabel controlId="username" label={t('register.form.username')}>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="password" label={t('register.form.password')}>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="passwordConfirmation"
            label={t('register.form.passwordConfirmation')}>
            <Form.Control
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm Password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.passwordConfirmation}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button variant="outline-primary" type="submit">
            {t('register.form.submit')}
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default RegisterPage;
