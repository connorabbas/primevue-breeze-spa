import { authenticatedMiddleware, guestMiddleware, verifiedUserMiddleware } from './index';

export default {
    auth: authenticatedMiddleware,
    guest: guestMiddleware,
    verified: verifiedUserMiddleware,
};
