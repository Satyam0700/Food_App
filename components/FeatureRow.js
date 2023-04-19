import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurentCard from './RestaurentCard'
import sanityClient from '../sanity'

const FeatureRow = ({ id, title, description }) => {
    const [restaurents, setRestaurents] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == 'featured' && _id == $id] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type-> {
                name
            }
          },
        }[0]
        `, { id }
        ).then(data => {
            setRestaurents(data.restaurants);
        })
    }, [id])

    return (
        <View>
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>
            <Text className='text-xs text-gray-500ss px-4'>{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {restaurents.map((restaurent) => (
                    <RestaurentCard
                        key={restaurent._id}
                        id={restaurent._id}
                        imgUrl={restaurent.image}
                        title={restaurent.name}
                        rating={restaurent.rating}
                        genre={restaurent.type?.name}
                        address={restaurent.address}
                        short_description={restaurent.short_description}
                        dishes={restaurent.dishes}
                        long={restaurent.long}
                        lat={restaurent.lat}
                    />
                ))}

            </ScrollView>
        </View>
    )
}

export default FeatureRow