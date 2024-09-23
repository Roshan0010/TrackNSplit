import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const CustomDropDown = ({ items, width = 120, height = 30, fontSize = 12, dropdownHeight = 200, onSelect,title }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!open);

  const selectItem = (item) => {
    setSelectedItem(item);
    // onSelect(item); // Call the onSelect function passed as a prop
    setOpen(false);
  };

  return (
    <View className="relative z-50" style={{ width }}>
      <TouchableOpacity
        className="bg-secondaryDarkBg rounded-md p-2 flex-row justify-between items-center"
        onPress={toggleDropdown}
        style={{ height }}
      >
        <Text className="text-white" style={{ fontSize }}>
          {selectedItem ? selectedItem.label : title}
        </Text>
        <Text className="text-white">{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && (
        <View className="absolute top-full mt-1 bg-secondaryDarkBg rounded-md shadow-lg" style={{ width }}>
          <ScrollView style={{ maxHeight: dropdownHeight }}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                className="p-2"
                onPress={() => selectItem(item)}
              >
                <Text className="text-white" style={{ fontSize }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;
