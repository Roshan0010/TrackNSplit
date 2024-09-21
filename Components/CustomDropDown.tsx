import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const CustomDropDown = ({ items, width = 120, height = 30, fontSize = 12 }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setOpen(false);
  };

  return (
    <View className={`relative ${open ? 'z-50' : 'z-10'}`} style={{ width }}>
      {/* Display the selected item or placeholder */}
      <TouchableOpacity
        className="bg-secondaryDarkBg rounded-md p-2 flex-row justify-between items-center"
        onPress={toggleDropdown}
        style={{ height }}
      >
        <Text className="text-white" style={{ fontSize }}>
          {selectedItem ? selectedItem.label : 'Select Month'}
        </Text>
        <Text className="text-white">{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Dropdown list */}
      {open && (
        <View className="absolute top-full mt-1 bg-secondaryDarkBg rounded-md shadow-lg "style={{ width }}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-2"
                onPress={() => selectItem(item)}
              >
                <Text className="text-white" style={{ fontSize }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 200 }} // Limit dropdown height
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;