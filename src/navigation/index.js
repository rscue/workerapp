import { createNavigationContainer, createNavigator } from 'react-navigation';

import NavigationRouter from './NavigationRouter';
import NavigationTab from './NavigationTab';

export default createNavigationContainer(createNavigator(NavigationRouter)(NavigationTab));