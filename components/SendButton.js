import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function SendButton({ onPress, title, inputMessage }) {
  const handleButtonPress = () => {
    console.log(inputMessage);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleButtonPress}
        activeOpacity={0.8}
        style={styles.sendButton}
      >
        <Text style={styles.sendButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sendButton: {
    backgroundColor: "#D6FFFF",
    elevation: 8,
    borderRadius: 50,
    height: 60,
    width: 60,
    alignSelf: "flex-start",
    justifyContent: "center",
    left: 20,
  },
  sendButtonText: {
    left: 9,
    top: 5,
  },
});
