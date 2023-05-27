import useAuth from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import routes from "../routes";
import * as yup from "yup";
import { Button, Container, FloatingLabel, Form, Stack } from "react-bootstrap";

const RegisterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object({
      username: yup
        .string("Enter your username")
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),
      password: yup
        .string("Enter your password")
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      passwordConfirmation: yup
        .string("Confirm your password")
        .required("Password Confirmation is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.signUpPath(), {
          username,
          password,
        });

        auth.logIn(data);
        navigate("/", { replace: true });
      } catch (e) {
        if (e.response.status === 409)
          formik.errors.passwordConfirmation = "User already exists";
      }
    },
  });

  return (
    <Container className="align-items-center">
      <Form onSubmit={formik.handleSubmit}>
        <Stack className="w-50" gap={3}>
          <FloatingLabel controlId="username" label="Username">
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
          <FloatingLabel controlId="password" label="Password">
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
            label="passwordConfirmation"
          >
            <Form.Control
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm Password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.passwordConfirmation}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button variant="outline-primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default RegisterPage;
