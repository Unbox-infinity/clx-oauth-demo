/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import { useEffect } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   ActivityIndicator,
   Dimensions,
   Linking,
   Platform,
   Alert,
 } from 'react-native';
 
 import {
   Colors,
   Header,
 } from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';

import pkceChallenge  from 'react-native-pkce-challenge';
import { authorizeServer, requestToken } from '../utils/request';
import {decode as base64Decoder} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  codeVerifier: 'code_verifier_auth',
  accessToken: 'access_token',
} 


 function AppHomeScreen({route, navigation}: { route: any, navigation: any}): React.JSX.Element {
   const isDarkMode = false;
   const [isLoading, setIsLoading] = useState<boolean>(false)
 
   const backgroundStyle = {
     backgroundColor: Colors.white,
   };

   const { height } = Dimensions.get('window')
 
   const handleLoginToServer = async (token: any, code_status: any) => {

    try {
      setIsLoading(true)
      if (code_status === 'refused' || code_status !== 'accepted') {
        throw {
          message: "Code status refused"
        }
      }

      const response: any = base64Decoder(token);
      const result = JSON.parse(response);
      const codeVerifier = await AsyncStorage.getItem(storageKeys.codeVerifier);
      const jwt = await requestToken(result.code, codeVerifier || '');
      console.log({
        jwt
      })
      await AsyncStorage.setItem(storageKeys.accessToken, JSON.stringify(jwt));
      navigation.navigate('LoggedInScreen');
    } catch (error: any) {
      Alert.alert(error?.message || 'Something went wrong!', error);
    } finally {
      setIsLoading(false)
    }
  };
   const handleLoginBtn = async () => {

    setIsLoading(true);
    try {
      const appInstalled = await Linking.canOpenURL('myunbox://');

      if (!appInstalled) {
        console.log({appNotInstalled: true})
      }

      const challenge = pkceChallenge();
      const url = 'myunbox://authorize';
      const codeChallenge = challenge.codeChallenge;
      const codeVerifier = challenge.codeVerifier;
      await AsyncStorage.setItem(storageKeys.codeVerifier, codeVerifier);
      const code = await authorizeServer(codeChallenge);
      
      const appToOpen = `${url}/${code.login_code_to_sign}?callback=clxauthdemo://app`;
      await Linking.openURL(appToOpen);
      setIsLoading(false);
    } catch (error: any) {
      console.log({error});
      Alert.alert('Error', JSON.stringify(error?.message || {message: 'something went wrong'}));
      setIsLoading(false);
    }
   }
   useEffect(() => {
     if (route?.params?.token) {
      console.log({
        route
      })
      handleLoginToServer(route.params.token, route.params.code_status);
     }
   }, [route?.params?.token, route?.params?.code_status]);
   return (
     
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            minHeight: height - 300,
            justifyContent: 'center',
            borderWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: 'blue',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={handleLoginBtn}>
            {isLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Text style={{
                color: Colors.white,
              }}>
                Login here
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
 
 export default AppHomeScreen;
