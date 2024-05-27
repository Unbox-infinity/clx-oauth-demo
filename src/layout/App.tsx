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
 } from 'react-native';
 
 import {
   Colors,
   Header,
 } from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';
 
 function AppHomeScreen({route, navigation}): React.JSX.Element {
   const isDarkMode = false;
   const [isLoading, setIsLoading] = useState<boolean>(false)
 
   const backgroundStyle = {
     backgroundColor: Colors.white,
   };

   const { height } = Dimensions.get('window')
 
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
            onPress={() => {
              setIsLoading(true)
              setTimeout(() => {
                setIsLoading(false)

                navigation.navigate('LoggedInScreen');
              }, 3000)
            }}>
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
