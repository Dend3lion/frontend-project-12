import { Button, Container, Navbar } from "react-bootstrap";
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

const Layout = () => {
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Chat
          </Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
