import { Text, View } from 'react-native'

export default function Index() {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{ 
        fontSize: 20
        }}>
          Hello React Native!
      </Text>
    </View>
  )
}