import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable'

const { Types, Creators} = createActions({
    profileRequest: ['providerId', 'workerId'],
});

export const ProfileTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: false,
});

export const request =  (state) => state.merge({ fetching: true, error: false});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PROFILE_REQUEST]: request,
});