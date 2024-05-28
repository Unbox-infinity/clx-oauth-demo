import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text, Alert } from "react-native"
import { useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from "./App";

const LoggedInScreen = () => {
  useEffect(() => {
    getJwt()
  }, [])

  const getJwt = async () => {
    const jwt: any = await AsyncStorage.getItem(storageKeys.accessToken);
    console.log(jwt)
  }
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{
          alignSelf: 'center',
          marginTop: 300,
        }}>
          <Text>Hello i am logged in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoggedInScreen;