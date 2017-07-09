import { call, put } from 'redux-saga/effects';

import ProfileActions from '../redux/ProfileRedux';

export function* loadProfile(api, action) {
    try {
        const { providerId, workerId } = action;
        const response = yield call(api.getProfile, providerId, workerId);
        if (response.ok) {
            const profile = response.data;
            yield put(ProfileActions.profileSuccess(profile.name, profile.lastName, profile.profilePictureUrl));
        } else {
            yield put(ProfileActions.profileError());
        }
    } catch (error) {
        yield put(ProfileActions.profileError());
    }
}