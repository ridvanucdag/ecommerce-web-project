import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <div className="content-wrapper">
        <div className="number-container">
          <svg viewBox="0 0 600 200" className="number-animation">
            <symbol id="s-text">
              <text textAnchor="middle" x="50%" y="50%" dy=".35em">
                404 Not Found
              </text>
            </symbol>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
          </svg>
        </div>

        <div className="text-content">
          <h1 className="notfound-title">{t('notFound.title')}</h1>
          <p className="description">
            {t('notFound.description')}
          </p>
          
          <Link to="/" className="home-button">
            <span className="button-text">{t('notFound.homeButton')}</span>
            <span className="button-icon">→</span>
          </Link>

          <p className="support-text">
            {t('notFound.supportText')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
