import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import { put, apply, call, delay } from 'redux-saga/effects';

import AuthActions from '../redux/AuthRedux';
import ProfileActions from '../redux/ProfileRedux';

const auth0 = new Auth0({ domain: Config.AUTH0_DOMAIN, clientId: Config.AUTH0_CLIENT_ID });

export function* loginRequest({ email, password }) {
    try {
        const authResult = yield call([auth0.auth, 'passwordRealm'],
            {
                scope: 'openid offline_access',
                username: email,
                password,
                realm: 'Username-Password-Authentication',
                audience: 'https://api.rscue.center/',
            });
        const userInfo = yield call([auth0.auth, 'userInfo'], {
            token: authResult.accessToken
        });
        const providerId = userInfo['https://api.rscue.center/provider_id'];
        const workerId = userInfo['https://api.rscue.center/worker_id'];
        yield put(AuthActions.loginSuccess(authResult.accessToken, authResult.expiresIn, authResult.refreshToken));
        yield put(ProfileActions.profileRequest(providerId, workerId));
    } catch (error) {
        yield put(AuthActions.loginFailure());
    }
}

export function* refreshToken({ expiresIn, refreshToken }) {
    try {
        let expireInMs = expireIn * 1000;
        while (true) {
            yield call(delay, expireInMs);
            const refreshResult = yield call([auth0.auth, 'refreshToken'], {
                refreshToken
            });
            expireInMs = refreshResult.expireIn * 1000;
            yield put(AuthActions.updateToken(refreshResult.accessToken, refreshResult.expiresIn));
        }
    }
    catch (error) {
        yield put(AuthActions.logout());
    }
}