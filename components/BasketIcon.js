import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketItemsTotal, } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {

  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketItemsTotal)

  if(items.length === 0) return null;

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className='bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1'
      >
        <Text className='text-lg bg-[#01A296] text-white px-2 py-1 font-extrabold'>{items.length}</Text>
        <Text className='text-white font-extrabold text-lg flex-1 text-center'>View Basket</Text>
        <Text className='text-lg text-white font-extrabold'>$ {basketTotal}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon