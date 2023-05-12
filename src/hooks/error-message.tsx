import { useTranslation } from 'react-i18next';
import '../i18nex';

function ErrorMessage() {
  const { t } = useTranslation();

  function setErrorMessage(error: string): string {
    let errorMessage;

    switch (error) {
      case 'auth/email-already-exists':
        errorMessage =
          'The provided email is already in use by an existing user. Each user must have a unique email.';
        break;
      case 'auth/id-token-expired':
        errorMessage = 'The provided Firebase ID token is expired.';
        break;
      case 'auth/id-token-revoked':
        errorMessage = 'The Firebase ID token has been revoked.';
        break;
      case 'auth/internal-error':
        errorMessage =
          'The Authentication server encountered an unexpected error while trying to process the request. Please, try again.';
        break;
      case 'auth/invalid-display-name':
        errorMessage =
          'The provided value for the displayName user property is invalid. It must be a non-empty string.';
        break;
      case 'auth/invalid-email':
        errorMessage =
          'The provided value for the email user property is invalid. It must be a string email address.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'The provided password for this user is incorrect. Please, try again.';
        break;
      case 'auth/user-not-found':
        errorMessage = t('errorMessages.userNotFound');
        break;
      case 'auth/email-already-in-use':
        errorMessage =
          'User with that email is allready exists! Please, check your email or use another one.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'There`s too many requests for now. Please, try again later.';
        break;
      default:
        errorMessage = 'Some unexpected error occured! Please, try again.';
        break;
    }

    return errorMessage;
  }

  return {
    setErrorMessage,
  };
}

export default ErrorMessage;
