import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function BackButton({ navigation, onPress, title }) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#181B24",
    elevation: 8,
    borderRadius: 50,
    height: 60,
    width: 60,
    alignSelf: "flex-start",
    justifyContent: "center",
    left: 20,
  },
  backButtonText: {
    left: 17,
    top: 3,
  },
});
