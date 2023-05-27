import useAuth from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import routes from "../routes";
import * as yup from "yup";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const LoginPage = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from.pathname || "/";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string("Enter your username")
        .required("Username is required"),
      password: yup
        .string("Enter your password")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.post(routes.loginPath(), values);

      auth.logIn(data);
      navigate(from, { replace: true });
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col sm={4}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                className="mb-3"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                className="mb-3"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LoginPage;
