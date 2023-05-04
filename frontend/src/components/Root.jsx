import { Button, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks";

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    <Button onClick={auth.logOut}>Log out</Button>
  ) : (
    <Button as={Link} to={"/login"} state={{ from: location }}>
      Log in
    </Button>
  );
};

const Root = () => {
  return (
    <>
      <Navbar>
        <Navbar.Brand as={Link} to={"/"}>
          Chat
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="public">
            Public page
          </Nav.Link>
          <Nav.Link as={Link} to={"/private"}>
            Private page
          </Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>

      <Outlet />
    </>
  );
};

export default Root;
