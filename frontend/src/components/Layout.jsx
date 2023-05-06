import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  Outlet,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
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

const Layout = () => {
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Chat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/public">
                Public page
              </Nav.Link>
              <Nav.Link as={Link} to="/chat">
                Private page
              </Nav.Link>
            </Nav>
            <AuthButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
