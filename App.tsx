/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {
  StyleSheet,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/RootStackNavigator';
import { callbackDeeplinkUnboxPath } from '@unbox-infinity/clx-auth-myunbox-react-native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer
      fallback={<Text>Loading...</Text>}
      linking={{
        enabled: true,
        prefixes: ['ClxAuthDemo://','clxauthdemo://'],
        config: {
          screens: {
            HomeScreen: {
              path: callbackDeeplinkUnboxPath,
            },
          },
        },
      }}>
        <RootStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
