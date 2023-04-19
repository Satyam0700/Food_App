import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'
import FocusedStatusBar from '../components/FocusedStatusBar'

const PreparingOrderScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 4000)
  }, [])


  return (
    <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
      <FocusedStatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <Animatable.Image
        source={{
          uri: 'https://cdn.dribbble.com/users/118459/screenshots/7025288/media/76c7f0aae651f067c46d5f6ab0840aee.gif'
        }}
        animation='slideInUp'
        iterationCount={1}
        className='w-96 h-96'
      />

      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg my-10 text-white font-bold text-center'
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color='white' />

    </SafeAreaView>
  )
}

export default PreparingOrderScreen