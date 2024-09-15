module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',        // Include App files
    './Screens/**/*.{js,jsx,ts,tsx}',  // Include all files in Screens and subfolders
    './Screens/mpin/*.{js,jsx,ts,tsx}', // Include all files in Screens/mpin
    './Components/**/*.{js,jsx,ts,tsx}', // Include all files in Components and subfolders
  ],
  theme: {
    extend: {
      colors: {
        fadedWhite: '#FEFFFE',    // Custom primary color
        primaryGreen: '#B1ED81',  // Custom secondary color
        secondaryGreen:"#3e7611",
        // Add more custom colors here
        primaryDarkBg: '#25262C', // Example custom color
        secondaryDarkBg: '#35363D', // Example custom color
        customBlack:"#35373C"
      },
    },
  },
  plugins: [],
}