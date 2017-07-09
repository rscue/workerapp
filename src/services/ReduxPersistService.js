import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import Config from 'react-native-config';

const updateReducers = (store) => {
    const reducerVersion = Config.REDUCER_VERSION;
    const startup = () => store.dispatch(StartupActions.startup());
    const config = {
        storage: AsyncStorage,
    };

    // Check to ensure latest reducer version
    AsyncStorage.getItem('reducerVersion').then((localVersion) => {
        if (localVersion !== reducerVersion) {
            // Purge store
            persistStore(store, config).purge()
            AsyncStorage.setItem('reducerVersion', reducerVersion)
        } else {
            persistStore(store, config);
        }
    }).catch(() => {
        persistStore(store, config);
        AsyncStorage.setItem('reducerVersion', reducerVersion)
    });
}

export default { updateReducers }