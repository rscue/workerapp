import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import { put, apply, call, wait } from 'redux-saga/effects';

import AuthActions from '../redux/AuthRedux';
import ProfileActions from '../redux/ProfileRedux';

import ApiService from '../services/ApiService';

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
        const expiresOn = new Date(Date.now() + (authResult.expiresIn * 1000));        
        ApiService.setAuthToken(authResult.accessToken);
        yield put(AuthActions.loginSuccess(authResult.accessToken, expiresOn, authResult.refreshToken));
        yield put(AuthActions.updateToken(authResult.accessToken, expiresOn));
        yield put(ProfileActions.profileRequest(providerId, workerId));
    } catch (error) {
        yield put(AuthActions.loginFailure());
    }
}

export function* refreshToken({ expiresOn, refreshToken }) {
    try {
        let expireInMs = Date.now() - expiresOn;
        while (true) {
            yield wait(expireInMs);
            const refreshResult = yield call([auth0.auth, 'refreshToken'], {
                refreshToken
            });
            const expiresOn = new Date(Date.now() + (authResult.expiresIn * 1000)); 
            expireInMs = refreshResult.expireIn * 1000;
            ApiService.setAuthToken(authResult.accessToken);
            yield put(AuthActions.updateToken(refreshResult.accessToken, expiresOn));
        }
    }
    catch (error) {
        yield put(AuthActions.logout());
    }
}

export function* updateApiAuthToken({ accessToken }) {
    yield call(ApiService.setAuthToken, accessToken);
}