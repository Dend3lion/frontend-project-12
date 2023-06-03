import { Button, Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalModal from '../components/GlobalModal';
import { useAuth } from '../contexts/AuthContext';

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    auth.loggedIn && (
      <Stack direction="horizontal">
        <div className="mx-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>{' '}
          <b>{auth.getCurrentUser()?.username}</b>
        </div>
        <Button
          variant="outline-primary"
          onClick={() => {
            auth.logOut();
            navigate('/');
          }}>
          {t('header.logout')}
        </Button>
      </Stack>
    )
  );
};

const Layout = () => {
  const { t } = useTranslation();

  return (
    <>
      <ToastContainer />
      <GlobalModal />

      <Stack className="h-100 bg-light">
        <Navbar expand="lg" className="bg-white shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('header.brand')}
            </Navbar.Brand>
            <Nav>
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
