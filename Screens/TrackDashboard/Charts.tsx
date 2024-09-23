import { View, Text } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import { monthlyData,months,years,ChartView } from '../../Screens/TrackDashboard/dummyData';
import CustomDropDown from '../../Components/CustomDropDown';

const Charts = () => {
  const monthData = monthlyData[1];

  // Function to format numbers as 'k'
  const formatValue = (value) => {
    if (value >= 1000) {
      const formattedValue = (value / 1000).toFixed(1);
      return formattedValue.endsWith('.0') ? `${parseInt(formattedValue)}k` : `${formattedValue}k`;
    }
    return value.toString(); // Return as string for values less than 1000
  };

  // Determine the maximum value among the weeks
  const weekValues = [monthData.week1, monthData.week2, monthData.week3, monthData.week4];
  const maxValue = Math.max(...weekValues);
  
  // Create pie data with the focused property for the maximum value
  const pieData = [
    { value: monthData.week1, color: '#d6f5bc', focused: monthData.week1 === maxValue }, 
    { value: monthData.week2, color: '#baef90', focused: monthData.week2 === maxValue },
    { value: monthData.week3, color: '#83e236', focused: monthData.week3 === maxValue },
    { value: monthData.week4, color: '#529c16', focused: monthData.week4 === maxValue },
  ];

  // Function to render color dots for the legend
  const renderDot = (color) => {
    return (
      <View className="h-2.5 w-2.5 rounded-full mr-2" style={{ backgroundColor: color }} />
    );
  };

  // Function to render a custom legend for the chart
  const renderLegendComponent = () => {
    return (
      <>
        <View className="flex-row justify-center mb-2.5">
          <View className="flex-row items-center w-30 mr-5">
            {renderDot('#d6f5bc')}
            <Text className="text-fadedWhite">week-1: ₹{formatValue(monthData.week1)}</Text>
          </View>
          <View className="flex-row items-center w-30">
            {renderDot('#baef90')}
            <Text className="text-fadedWhite">week-2: ₹{formatValue(monthData.week2)}</Text>
          </View>
        </View>
        <View className="flex-row justify-center">
          <View className="flex-row items-center w-30 mr-5">
            {renderDot('#83e236')}
            <Text className="text-fadedWhite">week-3: ₹{formatValue(monthData.week3)}</Text>
          </View>
          <View className="flex-row items-center w-30">
            {renderDot('#529c16')}
            <Text className="text-fadedWhite">week-4: ₹{formatValue(monthData.week4)}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View className="flex-1 justify-center items-center">

        <View className=' mb-10'>
        <CustomDropDown items={ChartView} title={"View"}/>
        </View>


         <View className='  w-full flex flex-row justify-between'>
            <CustomDropDown items={months} title={"Month"}/>
            <CustomDropDown items={years} title={"Year"}/> 
            

        </View>
        
      <View className=" flex-1 items-center justify-center  m-5 p-4 rounded-2xl shadow-lg">
       
        <View className="py-5  items-center">
          <PieChart
            donut
            data={pieData}
            radius={120}
            innerRadius={60} // Sets the inner circle to 50% of the whole radius
            innerCircleColor={'#35373C'} // Assign your desired background color here
            isAnimated={true} // Enables animation for the chart
            animationDuration={1000} // Animates the pie chart over 1 second
            showText={false} // Disable text in the pie slices
            sectionAutoFocus={true} // Automatically focuses on the section with focused: true
            centerLabelComponent={() => {
              return (
                <View className="flex flex-col items-center">
                  <Text className="text-white text-2xl font-bold">{monthData.month}</Text>
                 
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};

export default Charts;
// <Text className="text-white text-lg">{`${Math.round((maxValue / (monthData.week1 + monthData.week2 + monthData.week3 + monthData.week4)) * 100)}%`}</Text>

