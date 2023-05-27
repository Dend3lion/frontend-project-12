import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks";

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return auth.loggedIn ? (
    <Button
      onClick={() => {
        auth.logOut();
        navigate("/");
      }}
    >
      Log out
    </Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>
      Log in
    </Button>
  );
};

const RegistrationButton = () => {
  const auth = useAuth();

  return (
    !auth.loggedIn && (
      <Nav.Link as={Link} to="/signup" className="me-3">
        Register
      </Nav.Link>
    )
  );
};

const Layout = () => {
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Chat
          </Navbar.Brand>
          <Nav>
            <RegistrationButton />
            <AuthButton />
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
