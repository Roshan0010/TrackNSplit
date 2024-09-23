import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomDropDown from '../../Components/CustomDropDown';
import PieSvg from '../../assets/Svgs/PieSvg.svg'; 
import GraphIcon from '../../assets/Svgs/GraphIcon';
import HomeIcon from '../../assets/Svgs/HomeIcon';
import CustomModal from '../../Components/CustomModal'; // Adjust the import path as necessary
import CustomSpenView from '../../Components/CustomSpenView';
import{ data,months }from './dummyData';
import Charts from './Charts';

const TrackDashBoard = () => {
  const [focus, setFocus] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className='flex-1 justify-center items-center bg-primaryDarkBg'>
      <View className='flex-[10] w-full px-6'>
        <View className='h-[50%]' />
        <View className='h-[50%] w-full flex flex-row '>
          <View className='w-[50%] flex items-center'>
            <TouchableOpacity onPress={() => setFocus(true)}>
              <HomeIcon fillColor={focus ? '#B1ED81' : '#C4C5C4'} />
            </TouchableOpacity>
          </View>
          <View className='h-full w-[1px] bg-[#C4C5C4]' />
          <View className='w-[50%] flex items-center'>
            <TouchableOpacity onPress={() => setFocus(false)}>
              <GraphIcon fillColor={focus ? '#C4C5C4' : '#B1ED81'} />
            </TouchableOpacity>
          </View>
        </View>     
      </View>
      

      <View className='flex-[90] w-full px-4'>
      {focus ?
      <View>
        <View className='flex-[15%]  '>
            <View className='h-[40%] flex flex-row justify-between items-center'>
                <Text className='text-lg text-[#C4C5C4]'>Your Spends :</Text>
                <View >
                <CustomDropDown  items={months} title={"month"} />
                </View>

                </View>
                <View className='h-[50%] flex flex-row  '>
                <Text className='text-4xl tracking-widest font-extrabold text-fadedWhite'>
                  ₹38900
                </Text>
                </View>
           </View>
           <View className='flex-[75%]'>
           <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding for better scroll experience
        renderItem={({ item }) => (
          <CustomSpenView title={item.title} amount={item.amount} type={item.type} />
        )}
      />

           </View>
       
        
       <View className=' flex-[1%] bg-red w-full flex justify-center items-center'>
        <TouchableOpacity
          className='bg-primaryGreen w-16 h-16 rounded-full justify-center items-center'
          onPress={toggleModal}
        >
          <Text className='text-primaryDarkBg text-5xl translate-y-1'>+</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSubmit={null}
      />
      </View>
      
      :<Charts/>
      }
    </View>

     
    </View>
  );
};

export default TrackDashBoard;



// the dropDown is not working after its scope need to see the z index stuff will see




