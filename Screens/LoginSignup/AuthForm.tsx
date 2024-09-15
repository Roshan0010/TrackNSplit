import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GoogleSvg from "../../assets/Svgs/GoogleSvg.svg"
import MetaSvg from "../../assets/Svgs/MetaSvg.svg"
import CheckBox from 'react-native-check-box'
import Check from "../../assets/Svgs/ChechSvg.svg";
//@ts-ignore
import Uncheck from "../../assets/Svgs/UncheckSvg.svg";

const AuthForm = ({ isLogin, setLogin }) => {
  const [isCheck, setCheck] = useState(false)
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
    // Handle form submission
    Alert.alert('Form Submitted', JSON.stringify(values));
  };

  return (
    <View
      className='w-[100%] h-[100%] flex justify-center items-center '
    >
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
          <View className="h-[90%] w-[90%]  flexgap-4">
            <Text className="text-white text-3xl mb-5 ml-2">{isLogin?"Login":"Signup"}</Text>
            {!isLogin && (
              <View className="mb-4">
                <TextInput
                  className="border border-gray-300 text-fadedWhite p-2 rounded-full"
                  placeholder="Name"
                  placeholderTextColor="#bfbfbf" // Use your color here
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && <Text className="text-red-500">{errors.name}</Text>}
              </View>
            )}
            <View className="mb-4">
              <TextInput
                className="border border-gray-300 p-2 rounded-full text-fadedWhite"
                placeholder="Email"
                placeholderTextColor="#bfbfbf" // Use your color here
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email && <Text className="text-red-500 ml-2">{errors.email}</Text>}
            </View>
            <View className="mb-4">
              <TextInput
                className="border border-gray-300 p-2 rounded-full text-fadedWhite"
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#bfbfbf" // Use your color here
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password && <Text className="text-red-500 ml-2">{errors.password}</Text>}
            </View>
            <TouchableOpacity onPress={handleSubmit} className="bg-fadedWhite p-3 rounded-full">
              <Text className="text-customBlack text-lg text-center">{isLogin ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>

            {isLogin &&<View className="flex flex-row items-center mt-6">
               <View className="flex-1 h-px bg-gray-300"></View>
                <Text className="mx-4 text-white">or</Text>
                 <View className="flex-1 h-px bg-gray-300"></View>
                </View>}

            <View className="pt-5  justify-center items-center  ">
             {isLogin? <View className='flex flex-row gap-3'>
  
                <TouchableOpacity><GoogleSvg/></TouchableOpacity>
                <TouchableOpacity><MetaSvg/></TouchableOpacity>
              
              </View>:null}
             {!isLogin && <View className='flex flex-row'>
              <CheckBox
                  style={{flex: 1, padding: 10, }}
                  onClick={()=>{
                    setCheck(prev=>!prev)
                  }}
                  isChecked={isCheck}
                  leftText={"CheckBox"}
                  className=" h-10 "
                  checkedImage={<Check/>}
                  unCheckedImage={<Uncheck/>}
              />
                  <Text className='text-fadedWhite text-xs mt-3'>
                    i Agree with Terms of Service and Privacy Policy 
                  </Text></View>}
              <View className='flex flex-row  mt-4'>
              
              <Text className="text-white text-sm ">
              {isLogin ? 'Donot have an Account?' : 'Already have an account?'}{' '}
              </Text>
              <TouchableOpacity onPress={() => setLogin(!isLogin)}>
                
                  <Text className="text-blue-500 ">{isLogin ? 'Sign Up' : 'Login'}</Text>
                </TouchableOpacity>
               
            </View>
           
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AuthForm;