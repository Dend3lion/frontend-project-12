import useAuth from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import routes from "../routes";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";

const validationSchema = yup.object({
  email: yup.string("Enter your username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Auth = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authSuccesful, setAuthSuccesful] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { data } = await axios
        .post(routes.loginPath(), values)
        .catch(() => setAuthSuccesful(false));

      setAuthSuccesful(true);
      localStorage.setItem("userId", JSON.stringify(data));
      auth.logIn();

      const path = location.state.from || { pathname: "/" };
      navigate(path);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          isValid={authSuccesful}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          isValid={authSuccesful}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Auth;
