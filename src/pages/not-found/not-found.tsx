import { useTranslation } from 'react-i18next';
import './not-found.css';
import '../../i18nex';

function NotFound() {
  const { t } = useTranslation();
  return <div className="notFound">{t('notFoundPage.notFound')}</div>;
}

export default NotFound;
