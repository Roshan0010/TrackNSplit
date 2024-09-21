import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';

const OTPForm = ({ onSubmit, userEmail }) => {
  const [resendOtp, setResendOtp] = useState(false);
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));
  const [errors, setErrors] = useState(Array(6).fill(''));

  const getMaskedEmail = (email) => {
    const firstFourChars = email.slice(0, 4);
    const domain = email.split('@')[1];
    return `${firstFourChars}...@${domain}`;
  };

  const maskedEmail = getMaskedEmail(userEmail);

  const otpInputRefs = Array.from({ length: 6 }, () => useRef(null));

  // Focus the first input box on mount
  useEffect(() => {
    otpInputRefs[0].current.focus();
  }, []);

  const handleOTPChange = (index, key) => {
    if (key === 'Backspace') {
      // Handle backspace: move focus to the previous box if current box is empty
      if (index > 0) {
        otpInputRefs[index - 1].current.focus();
      }
    } else {
      // Handle other keys: move focus to the next box if the value length is 1
      if (index < otpInputRefs.length - 1) {
        otpInputRefs[index + 1].current.focus();
      }
    }
  };

  const handleTextChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value.length === 0) {
      handleOTPChange(index, 'Backspace');
    } else {
      handleOTPChange(index, 'Enter');
    }
  };
 const handleOtpReset=()=>{
    setOtpValues(Array(6).fill(''));
    otpInputRefs[0].current.focus();
    setResendOtp(true)
  }

  const validateOTP = () => {
    const newErrors = otpValues.map(value => (value ? '' : 'Required'));
    setErrors(newErrors);
    return newErrors.every(error => !error);
  };

  const handleSubmit = () => {
    if (validateOTP()) {
      const otp = otpValues.join('');
      onSubmit({ otp });
    } else {
      Alert.alert('Validation Error', 'All fields are required.');
    }
  };

  return (
    <View className="h-[90%] w-[90%] flex gap-4">
      <Text className="text-white text-3xl mb-5 ml-2">{resendOtp ? "Re-Enter OTP" : "Enter OTP"}</Text>
      <View className='flex flex-row justify-center'>
        <Text className="text-white text-sm mb-5 ml-2">Enter the OTP sent to </Text>
        <Text className="text-primaryGreen text-sm mb-5 ml-2">{maskedEmail}</Text>
      </View>

      <View className="flex flex-row justify-between">
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={{ borderBottomWidth: 2, borderColor: 'gray', width: 40, height: 50 }}>
            <TextInput
              ref={otpInputRefs[index]}
              keyboardType="numeric"
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                fontSize: 24,
                color: 'white',
              }}
              maxLength={1}
              onKeyPress={(event) => handleOTPChange(index, event.nativeEvent.key)}
              onChangeText={(value) => handleTextChange(value, index)}
              value={otpValues[index]}
            />
            {errors[index] && <Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>{errors[index]}</Text>}
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handleSubmit} className="bg-fadedWhite p-3 rounded-full mt-4">
        <Text className="text-customBlack text-lg text-center">Submit OTP</Text>
      </TouchableOpacity>

      <View className='flex flex-row justify-center'>
        <Text className="text-white text-sm mb-5 ml-2">Didn't Receive the OTP?</Text>
        <TouchableOpacity onPress={() => handleOtpReset()}>
          <Text className="text-primaryGreen text-sm mb-5 ml-1">Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPForm;