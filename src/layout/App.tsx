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
   Alert,
 } from 'react-native';
 
 import {
   Colors,
   Header,
 } from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';

import { UnboxSignIn, UnboxConfig, UnboxCallback } from '@unbox-infinity/clx-auth-myunbox-react-native';


 function AppHomeScreen(): React.JSX.Element {
   const isDarkMode = false;
   const [isLoading, setIsLoading] = useState<boolean>(false)
 
   const backgroundStyle = {
     backgroundColor: Colors.white,
   };

   const { height } = Dimensions.get('window')
   useEffect(() => {
    // 1st step: init client id, deeplink app name and environment
    UnboxConfig.init({
      clientId: process.env.CLIENT_ID || '35d4cd71-ef6c-4ddc-9418-8f7e673a1c34',
      appName: 'clxauthdemo',
      env: 'dev' // [dev, uat, prd],
    })
   }, [])

   const handleLoginBtn = async () => {
    try {
      setIsLoading(true)
      await UnboxSignIn() // 2nd step: login button handler
    } catch (error: any) {
      console.log({error});
      Alert.alert('Error', JSON.stringify(error?.message || {message: 'something went wrong'}));
    } finally {
      setIsLoading(false)
    }
   }
   return (
     
    <SafeAreaView style={backgroundStyle}>
      {/** 3nd step: import callback component */}
      <UnboxCallback callbackScreen="LoggedInScreen" />
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
