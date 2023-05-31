import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  return (
    <Container>
      <div id="error-page">
        <h1>{t('errors.page.title')}</h1>
        <p>{t('errors.page.body')}</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Container>
  );
};

export default ErrorPage;
