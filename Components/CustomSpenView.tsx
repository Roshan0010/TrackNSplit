import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DownArrow from '../assets/Svgs/DownArrow.svg';
import UpArrow from '../assets/Svgs/UpArrow.svg';

const CustomSpenView = ({ title = "Weekly Groceries", amount = 500, type = "spend" }) => {
  return (
    <View className='w-full py-4'>
      <TouchableOpacity className='flex flex-row justify-between items-center px-5'>
        <View className='w-[50%]'>
          <Text className='text-xl text-secondaryText'>
            {title.length > 15 ? title.substring(0, 15) + '...' : title}
          </Text>
        </View>
        <View className='w-[50%] flex flex-row items-center justify-between gap-2'>
          <Text className='text-3xl text-secondaryText'>₹{amount}</Text>
          {type === 'spend' ? <DownArrow /> : <UpArrow />}
        </View>
      </TouchableOpacity>

      {/* Centered horizontal line */}
      <View className='w-[95%] h-[0.5px] bg-gray-400 mt-5 self-center' />
    </View>
  );
};

export default CustomSpenView;