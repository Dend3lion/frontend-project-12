import { Button, Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks';

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    auth.loggedIn && (
      <Button
        onClick={() => {
          auth.logOut();
          navigate('/');
        }}>
        {t('header.logout')}
      </Button>
    )
  );
};

const Layout = () => {
  const { t } = useTranslation();

  return (
    <>
      <ToastContainer />

      <Stack className="h-100 bg-light">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('header.brand')}
            </Navbar.Brand>
            <Nav>
              ∏
              <AuthButton />
            </Nav>
          </Container>
        </Navbar>

        <Outlet />
      </Stack>
    </>
  );
};

export default Layout;
