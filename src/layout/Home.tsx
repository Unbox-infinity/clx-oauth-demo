import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text} from "react-native"
import { useEffect } from "react"
import { UnboxConfig } from '@unbox-infinity/clx-auth-myunbox-react-native';

const LoggedInScreen = () => {
  useEffect(() => {
    getJwt()
  }, [])

  const getJwt = async () => {
    // 4nd step: get the jwt.access_token
    const { jwt } = await UnboxConfig.get()
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
          <Text>Hello i logged in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default LoggedInScreen;