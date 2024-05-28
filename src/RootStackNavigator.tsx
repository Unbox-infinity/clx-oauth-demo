import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppHomeScreen from './layout/App';
import LoggedInScreen from './layout/Home';

const RootStack = createNativeStackNavigator<any>();
const RootStackNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={'HomeScreen'}>
      <RootStack.Screen
        name={'HomeScreen'}
        options={{
          headerShown: false,
        }}
        component={AppHomeScreen}
      />
      <RootStack.Screen
        name={'LoggedInScreen'}
        options={{
          headerShown: false,
        }}
        component={LoggedInScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
