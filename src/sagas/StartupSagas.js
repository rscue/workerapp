import { select, put} from 'redux-saga/effects';

import AuthActions from '../redux/AuthRedux';

const selectToken = (state) => state.auth.token;

export function* startup() {
    const token = yield select(selectToken);
    if (!token) {
    }
}