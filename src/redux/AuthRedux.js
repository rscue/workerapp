import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    loginRequest: ['email', 'password'],
    loginSuccess: ['accessToken', 'expiresOn', 'refreshToken'],
    loginFailure: null,
    updateToken: ['accessToken', 'expiresOn'],
    logout: null
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: false,
    accessToken: null,
    expiresOn: null,
    refreshToken: null,
});

export const request = (state) => state.merge({ fetching: true, error: false });
export const sucess = (state, { accessToken, expiresOn, refreshToken }) =>
    state.merge({ fetching: false, error: false, accessToken, expiresOn, refreshToken });
export const failure = (state) => state.merge({ fetching: false, error: true });
export const update = (state, { accessToken, expiresOn }) => state.merge({ accessToken, expiresOn });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: request,
    [Types.LOGIN_SUCCESS]: sucess,
    [Types.LOGIN_FAILURE]: failure,
    [Types.UPDATE_TOKEN]: update,
});
