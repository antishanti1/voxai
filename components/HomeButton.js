import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function HomeButton({ navigation, onPress, title }) {
  const buttonShadow = {
    elevation: 8,
    shadowColor: "#D6FFFF",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.homeButton, buttonShadow]}
      >
        <Text style={styles.homeButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    backgroundColor: "#D6FFFF",
    elevation: 8,
    borderRadius: 50,
    width: "80%",
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
  },
  homeButtonText: {
    fontSize: 20,
    color: "#0C101D",
    fontFamily: "RubikMedium",
    alignSelf: "center",
  },
});
