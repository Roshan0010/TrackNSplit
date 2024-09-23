import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { categories } from "../Screens/TrackDashboard/dummyData";
import CustomDropDown from './CustomDropDown'; // Import your CustomDropDown component



const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const CustomModal = ({ isVisible, onClose, onSubmit, modalTitle = "Enter New Expense" }) => {
  const [amount, setAmount] = useState('0');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  const handleSubmit = () => {
    // Handle submission logic
    // onSubmit();

    // Reset input fields
    setAmount('0');
    setTitle('');
    setDescription('');
    setSelectedCategory(null); // Reset selected category

    // Close the modal
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropColor="transparent"
      backdropOpacity={0.5}
      style={styles.wrapper}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.modalContent}>
          <Text className='text-fadedWhite mb-2'>{modalTitle}</Text>

          <View className="h-[20%] w-full mb-2">
            <CustomDropDown 
              items={categories} 
              width="100%" 
              height={40}
              onSelect={setSelectedCategory} // Pass the selected item function
              title={"Category"}
            />
          </View>

          <View className="h-[15%] w-full mb-2">
            <TextInput
              placeholder="Enter title"
              placeholderTextColor="#A9A9A9"
              className="bg-tertiaryDarkBg text-white rounded-md p-2 w-full h-full"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="h-[30%] w-full mb-2">
            <View className='flex flex-row justify-center items-center'>
              <Text className='text-3xl text-fadedWhite'>₹</Text>
              <TextInput
                placeholder=""
                placeholderTextColor="#A9A9A9"
                keyboardType="number-pad"
                className="text-white rounded-md p-2 text-3xl text-center"
                value={amount}
                onFocus={() => setAmount('')}
                onBlur={() => {
                  if (amount === '') setAmount('0');
                }}
                onChangeText={setAmount}
              />
            </View>
            <View className='w-[50%] h-[0.5px] bg-gray-400 mt-1 self-center' />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-primaryGreen rounded-full p-2 w-full h-[17%] flex justify-center"
          >
            <Text className="text-tertiaryDarkBg text-center">Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: screenWidth * 0.9,
  },
  modalContent: {
    height: screenHeight * 0.45,
    backgroundColor: '#35373C',
    borderRadius: 20,
    padding: 16,
  },
});

export default CustomModal;
