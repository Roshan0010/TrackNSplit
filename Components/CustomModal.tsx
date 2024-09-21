// CustomModal.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const CustomModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropColor="transparent" // Transparent backdrop
      backdropOpacity={0.5} // Slight opacity for the backdrop
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>This is the modal content</Text>
        {/* Add your modal content here */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center', // Center horizontally
    margin: 0,
    alignItems: 'center', // Center horizontally
  },
  modalContent: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.35, // 40% of the screen height
    backgroundColor: '#35373C',
    borderRadius: 20, // Combined border radius for both corners
    padding: 16,
    position: 'absolute',
    top: screenHeight * 0.65, // Adjust this value to position the modal vertically
  },
  modalText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CustomModal;