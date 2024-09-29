import authenticatedMiddleware from './auth';
import globalMiddleware from './global';
import guestMiddleware from './guest';
import verifiedUserMiddleware from './verified-user';

export default {
    auth: authenticatedMiddleware,
    global: globalMiddleware,
    guest: guestMiddleware,
    verified: verifiedUserMiddleware,
};
