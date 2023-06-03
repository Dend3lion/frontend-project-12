import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
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
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={{ span: 4 }}>
          <div className="bg-white p-4 rounded shadow-sm">
            <Form onSubmit={formik.handleSubmit}>
              <Stack gap={3} className="align-middle ">
                <h4 className="mx-auto">{t('login.title')}</h4>
                <FloatingLabel controlId="loginUsername" label={t('login.form.username')}>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder={t('login.form.username')}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.username && formik.errors.username}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="loginPassword" label={t('login.form.password')}>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder={t('login.form.password')}
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
                <hr className="mb-0" />
                <p className="mb-0">
                  {t('login.registerText')} <Link to="/signup">{t('login.registerLink')}</Link>
                </p>
              </Stack>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
