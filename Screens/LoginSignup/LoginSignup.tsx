import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import React, { useState } from 'react';
import AuthForm from './AuthForm'; // Make sure the path is correct
//@ts-ignore
import finGraph from '../../assets/Images/FinGraph.png';


const LoginSignup = () => {
  const [isLogin, setLogin] = useState(true);

  return (
    <View className="flex-1 bg-[#E9DBB2]">
      {/* Outer container taking 100% height */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View className="flex-1 w-full">
          
          {/* Blank top section */}
          <View style={{ height: isLogin ? '30%' : '30%' }} >
            <Image source={finGraph} style={{ width: '100%', height: '100%', resizeMode: 'borderColor' }} />
          </View>
          
          {/* Main content section */}
          <View
            style={{ height: isLogin ? '80%' : '85%' }}
            className="bg-[#25262C] rounded-t-3xl flex-1"
          >
            {/* Form field section */}
            <View className="flex-1 justify-center items-center px-4">
              
              <AuthForm isLogin={isLogin} setLogin={setLogin} />
            </View>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginSignup;