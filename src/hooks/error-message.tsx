import { useTranslation } from 'react-i18next';
import '../i18nex';

function ErrorMessage() {
  const { t } = useTranslation();

  function setErrorMessage(error: string): string {
    let errorMessage;

    switch (error) {
      case 'auth/email-already-exists':
        errorMessage = t('errorMessages.emailAlreadyExists');
        break;
      case 'auth/id-token-expired':
        errorMessage = t('errorMessages.idTokenExpired');
        break;
      case 'auth/id-token-revoked':
        errorMessage = t('errorMessages.idTokenRevoked');
        break;
      case 'auth/internal-error':
        errorMessage = t('errorMessages.internalError');
        break;
      case 'auth/invalid-display-name':
        errorMessage = t('errorMessages.invalidDisplayName');
        break;
      case 'auth/invalid-email':
        errorMessage = t('errorMessages.invalidEmail');
        break;
      case 'auth/wrong-password':
        errorMessage = t('errorMessages.wrongPassword');
        break;
      case 'auth/user-not-found':
        errorMessage = t('errorMessages.userNotFound');
        break;
      case 'auth/email-already-in-use':
        errorMessage = t('errorMessages.emailAlreadyInUse');
        break;
      case 'auth/too-many-requests':
        errorMessage = t('errorMessages.tooManyRequests');
        break;
      default:
        errorMessage = t('errorMessages.default');
        break;
    }

    return errorMessage;
  }

  return {
    setErrorMessage,
  };
}

export default ErrorMessage;
