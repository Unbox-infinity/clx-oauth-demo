import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text } from "react-native"

const LoggedInScreen = () => {
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