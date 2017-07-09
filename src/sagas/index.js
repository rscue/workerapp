import { takeLatest, all } from 'redux-saga/effects';

import { StartupTypes } from '../redux/StartupRedux';
import { AuthTypes } from '../redux/AuthRedux';

import { startup } from './StartupSagas';
import { loginRequest, refreshToken } from './AuthSagas';

export default function* root() {
    yield all([
        takeLatest(StartupTypes.STARTUP, startup),
        takeLatest(AuthTypes.LOGIN_REQUEST, loginRequest),
        takeLatest(AuthTypes.LOGIN_SUCCESS, refreshToken),
    ])
}