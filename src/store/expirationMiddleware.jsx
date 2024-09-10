import { logout } from './authSlice';

const expirationMiddleware = store => next => action => {
    if (action.type === 'auth/setCredentials') {
        const expirationTime = localStorage.getItem('expirationTime');
        if (expirationTime) {
            const remainingTime = new Date(expirationTime).getTime() - new Date().getTime();
            if (remainingTime > 0) {
                setTimeout(() => {
                    store.dispatch(logout());
                }, remainingTime);
            }
        }
    }
    return next(action);
};

export default expirationMiddleware;
