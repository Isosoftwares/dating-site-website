// SelectCustomStyle.jsx

const isDarkTheme = () => localStorage.getItem("theme") === "dark";

const SelectCustomStyle = () => {
  const isDark = isDarkTheme(); // Check the theme whenever this function is called

  return {
    control: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#2d3748" : "#fff", // Background color for dark/light theme
      borderColor: isDark ? "#4a5568" : "#e2e8f0", // Border color for dark/light theme
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#2d3748" : "#fff", // Menu background color
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? isDark
          ? "#4a5568"
          : "#e2e8f0"
        : state.isFocused
        ? isDark
          ? "#2d3748"
          : "#edf2f7"
        : "transparent",
      color: isDark ? "#fff" : "#2d3748", // Text color for options
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? "#fff" : "#2d3748", // Text color for the selected value
    }),
  };
};

export default SelectCustomStyle;
