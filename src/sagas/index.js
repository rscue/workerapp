import { takeLatest, all, select, call } from 'redux-saga/effects';

import { StartupTypes } from '../redux/StartupRedux';
import { AuthTypes } from '../redux/AuthRedux';
import { ProfileTypes } from '../redux/ProfileRedux';

import { startup } from './StartupSagas';
import { loginRequest, refreshToken, updateApiAuthToken } from './AuthSagas';
import { loadProfile } from './ProfileSagas';

import ApiService from '../services/ApiService';

export function* updateApiAuthHeader({ accessToken }) {
    yield call(ApiService.setAuthToken, accessToken);
}

export default function* root() {
    yield all([
        takeLatest(StartupTypes.STARTUP, startup),
        takeLatest(AuthTypes.LOGIN_REQUEST, loginRequest),
        takeLatest(AuthTypes.LOGIN_SUCCESS, refreshToken),
        takeLatest(AuthTypes.UPDATE_TOKEN, updateApiAuthHeader),
        takeLatest(ProfileTypes.PROFILE_REQUEST, loadProfile, ApiService)
    ])
}