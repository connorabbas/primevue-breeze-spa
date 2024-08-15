import authenticatedMiddleware from './auth';
import guestMiddleware from './guest';
import verifiedUserMiddleware from './verified-user';

export default {
    auth: authenticatedMiddleware,
    guest: guestMiddleware,
    verified: verifiedUserMiddleware,
};
