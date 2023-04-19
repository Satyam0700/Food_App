import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeToBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice'

const DishRow = ({ id, name, description, price, image }) => {

    const [isPresses, setIsPresses] = useState(false)
    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    const dispatch = useDispatch();

    const addItems = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    }

    const removeItems = () => {
        if (!items.length > 0) return;

        dispatch(removeToBasket({ id }))
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPresses(!isPresses)}
                className={`bg-white border p-4 border-gray-200 ${isPresses && "border-b-0"}`}
            >
                <View className='flex-row '>
                    <View className='flex-1'>
                        <Text className='text-lg mb-1'>{name}</Text>
                        <Text className='text-gray-400'>{description}</Text>
                        <Text className='text-gray-400 mt-2'>$ - {price} </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: "#F3F3F4"
                            }}
                            source={{ uri: urlFor(image).url() }}
                            className='h-20 w-20 bg-gray-300 p-4'
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isPresses && (
                <View className='bg-white px-4'>
                    <View className='flex-row items-center space-x-2 pb-3'>
                        <TouchableOpacity
                            disabled={!items.length}
                            onPress={removeItems}
                        >
                            <MinusCircleIcon
                                color={items.length > 0 ? "#00CCBB" : "gray"}
                                size={40}
                            />
                        </TouchableOpacity>

                        <Text>{items.length}</Text>

                        <TouchableOpacity onPress={addItems}>
                            <PlusCircleIcon
                                color="#00CCBB"
                                size={40}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow