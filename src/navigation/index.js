import { createNavigationContainer, createNavigator, StackNavigator } from 'react-navigation';

import NavigationRouter from './NavigationRouter';
import NavigationTab from './NavigationTab';

import LoginContainer from '../containers/LoginContainer';

const SignedOut = StackNavigator(
    {
        Login: {
            screen: LoginContainer,
            navigationOptions: {
                gestureEnabled: false,
            }
        }
    },
    {
        headerMode: 'none'
    }
);

const SignedIn = createNavigationContainer(createNavigator(NavigationRouter)(NavigationTab));

export default (loggedIn = false) => StackNavigator(
    {
        SignedOut: {
            screen: SignedOut,
            navigationOptions: {
                gestureEnabled: false,
            }
        },
        SignedIn: {
            screen: SignedIn,
            navigationOptions: {
                gestureEnabled: false,
            }
        },
    },
    {
        headerMode: 'none',
        initialRouteName: loggedIn ? 'SignedIn' : 'SignedOut'
    }
);