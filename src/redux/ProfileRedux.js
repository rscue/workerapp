import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    profileRequest: ['providerId', 'workerId'],
    profileError: null,
    profileSuccess: ['name', 'lastName', 'profilePictureUrl'],
});

export const ProfileTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: false,
    name: null,
    lastName: null,
    id: null,
    providerId: null,
    profilePictureUrl: null,
});

export const request = (state) => state.merge({ fetching: true, error: false });
export const error = (state) => state.merge({ fetching: false, error: true });
export const success = (state, { name, lastName, profilePictureUrl }) =>
    state.merge({ fetching: false, error: false, name, lastName, profilePictureUrl });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PROFILE_REQUEST]: request,
    [Types.PROFILE_ERROR]: error,
    [Types.PROFILE_SUCCESS]: success,
});