import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GoogleSvg from "../../assets/Svgs/GoogleSvg.svg";
import MetaSvg from "../../assets/Svgs/MetaSvg.svg";
import CheckBox from 'react-native-check-box';
import Check from "../../assets/Svgs/ChechSvg.svg";
import Uncheck from "../../assets/Svgs/UncheckSvg.svg";
import OTPForm from './OTPForm';  // Import the OTPForm component

const AuthForm = ({ isLogin, setLogin }) => {
  const [isCheck, setCheck] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false);  // State to toggle OTP form
  const [userEmail,setUserEmail] = useState('');

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const signupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    // Handle form submission for login/signup  
        setUserEmail(values.email);
    if (!isLogin) {
      // If it's a signup, simulate sending OTP
      Alert.alert('Signup Successful', 'OTP Sent');
      // Set OTP sent to true
    } else {
      Alert.alert('Login Successful', JSON.stringify(values));
      setOtpSent(true);
    }
  };

  const handleOtpSubmit = (values) => {
    // Handle OTP submission
    Alert.alert('OTP Submitted', JSON.stringify(values));
    // setOtpSent(false);  // Reset OTP state after successful OTP submission
  };

  // Field configurations for both login and signup forms
  const fieldsConfig = [
    {
      name: 'name',
      placeholder: 'Name',
      isVisible: !isLogin,
      secureTextEntry: false,
      validationError: 'name',
    },
    {
      name: 'email',
      placeholder: 'Email',
      isVisible: true,
      secureTextEntry: false,
      validationError: 'email',
    },
    {
      name: 'password',
      placeholder: 'Password',
      isVisible: true,
      secureTextEntry: true,
      validationError: 'password',
    },
  ];

  return (
    <View className='w-[100%] h-[100%] flex justify-center items-center '>
      {isOtpSent ? (
        <OTPForm onSubmit={handleOtpSubmit} userEmail={userEmail} />
      ) : (
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            mobile: '',
          }}
          validationSchema={isLogin ? loginSchema : signupSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <View className="h-[90%] w-[90%] flex ">
              <Text className="text-white text-3xl mb-5 ml-2">{isLogin ? "Login" : "Signup"}</Text>
              
              {/* Dynamic form fields rendering using map */}
              {fieldsConfig.map(
                (field) =>
                  field.isVisible && (
                    <View key={field.name} className="mb-4">
                      <TextInput
                        className="border border-gray-300 p-2 rounded-full text-fadedWhite"
                        placeholder={field.placeholder}
                        placeholderTextColor="#bfbfbf"
                        secureTextEntry={field.secureTextEntry}
                        onChangeText={handleChange(field.name)}
                        onBlur={handleBlur(field.name)}
                        value={values[field.name]}
                      />
                      {errors[field.validationError] && touched[field.validationError] && (
                        <Text className="text-red-500 ml-2">{errors[field.validationError]}</Text>
                      )}
                    </View>
                  )
              )}

              <TouchableOpacity onPress={handleSubmit} className="bg-fadedWhite p-3 rounded-full">
                <Text className="text-customBlack text-lg text-center">{isLogin ? 'Login' : 'Sign Up'}</Text>
              </TouchableOpacity>

              {isLogin && (
                <View className="flex flex-row items-center mt-6">
                  <View className="flex-1 h-px bg-gray-300"></View>
                  <Text className="mx-4 text-white">or</Text>
                  <View className="flex-1 h-px bg-gray-300"></View>
                </View>
              )}

              <View className="pt-5 justify-center items-center">
                {isLogin ? (
                  <View className='flex flex-row gap-3'>
                    <TouchableOpacity><GoogleSvg /></TouchableOpacity>
                    <TouchableOpacity><MetaSvg /></TouchableOpacity>
                  </View>
                ) : null}

                {!isLogin && (
                  <View className='flex flex-row justify-center '>
                    <CheckBox
                      style={{padding: 10 }}
                      onClick={() => setCheck(prev => !prev)}
                      isChecked={isCheck}
                      className="h-10"
                      checkedImage={<Check />}
                      unCheckedImage={<Uncheck />}
                    />
                    <Text className='text-fadedWhite text-xs mt-3'>
                      I agree with Terms of Service and Privacy Policy
                    </Text>
                  </View>
                )}

                <View className='flex flex-row mt-4'>
                  <Text className="text-white text-sm">
                    {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
                  </Text>
                  <TouchableOpacity onPress={() => setLogin(!isLogin)}>
                    <Text className="text-blue-500">{isLogin ? 'Sign Up' : 'Login'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};

export default AuthForm;