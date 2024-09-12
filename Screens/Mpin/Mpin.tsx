import React, { useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as SecureStore from 'expo-secure-store';
//@ts-ignore
import BackSvg from "../../assets/Svgs/BackSvg"
//@ts-ignore
import TickSvg from "../../assets/Svgs/TickSvg.svg"
const Mpin = () => {
  const arr = [["1", "2", "3"], ["4", "5", "6"], ["7","8","9"], ["0","<-","->"]];
  const [mpin,setMpin]=useState('');
  const [isSetMpin,setSetMpin]=useState(true);
  
  async function storeMpin() {
   
}
// async function retiveMpin() {
//   result = await SecureStore.getItemAsync("mpin");
//   return res;
// }


const onButtonPress = async (press: string) => {
  // Handle '<-' button press
  if (press === "<-") {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setMpin((prev) => prev.slice(0, -1));
    return;
  }

  // Handle '->' button press
  if (press === '->') {
    if (mpin.length === 4) {
      if (isSetMpin) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        // Set the MPIN to persistent storage
        await SecureStore.setItemAsync("mpin", mpin);
        console.log("MPIN set");
      } else {
        const storedMpin = await SecureStore.getItemAsync("mpin");
        if (storedMpin === mpin) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          alert("MPIN is correct");
        } else {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          alert("MPIN is incorrect");
        }
      }
      return;
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      alert("MPIN must be 4 digits long");
      return;
    }
  }

  // Handle digit input
  if (press !== '->' && mpin.length<4) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newMpin = press === "<-" ? mpin.slice(0, -1) : mpin + press;
    setMpin(newMpin);
    
    // Automatically handle validation or setting when MPIN length reaches 4
    if (newMpin.length === 4) {
      // if (isSetMpin === true) {
      //   // Automatically set MPIN if it's set mode
      //   await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      //   await SecureStore.setItemAsync("mpin", newMpin);
      //   console.log("MPIN set automatically");
      // } 
      if (isSetMpin === false) {
        // Automatically validate MPIN if it's check mode
        const storedMpin = await SecureStore.getItemAsync("mpin");
        if (storedMpin === newMpin) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          alert("MPIN is correct");
        } else {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          alert("MPIN is incorrect");
        }
      }
      return;
    }
  }
  else{
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};


  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#25262C] ">
      <View className=" rounded-3xl  bg-[#25262C] p-5 flex-1 justify-center items-center gap-10 ">
        
        {/* Title Section */}
        <Text className='text-white text-3xl'>Set MPIN </Text>
       
        <View className="bg-[#35363D] h-20 w-[200px] rounded-xl flex justify-center items-center">
          <Text className="text-white text-5xl tracking-wide">{mpin}</Text>
    
        </View>

        {/* Grid Section */}
        {arr.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row gap-2 justify-between mt-6">
            {row.map((item) => {
              if (item === "<-") {
                return(
              <TouchableOpacity onPress={()=>onButtonPress(item)}  key={item} className="bg-red-400 h-16 w-[30%] flex justify-center items-center rounded-xl">
               <BackSvg/>
              </TouchableOpacity>
                )
                
              }
              if (item === "->" ) {
                if(isSetMpin===true && mpin.length === 4){
                   return(
                    <TouchableOpacity onPress={()=>onButtonPress(item)}  key={item} className="bg-[#FEFFFE]  h-16 w-[30%] flex justify-center items-center rounded-xl">
                     <TickSvg/>
                    </TouchableOpacity>
                      )
                }
                else{
                  return
                }
               
                
              }
           
              return(
              <TouchableOpacity onPress={()=>onButtonPress(item)} key={item} className="bg-[#B1ED81]  h-16 w-[30%] flex justify-center items-center rounded-xl">
                <Text className="text-3xl text-[#35373C] ">{item}</Text>
              </TouchableOpacity>
              )
})}
            
          </View>
        ))}
      </View>
    
    </SafeAreaView>
  );
};


export default Mpin;