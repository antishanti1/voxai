import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import BackButton from "../components/BackButton";
import { SvgUri } from "react-native-svg";
import ChatNav from "../components/ChatNav";
import SendButton from "../components/SendButton";
import { HeaderBackButton } from "react-navigation-stack";

export default function Chat() {
  const [text, onChangeText] = React.useState("Hello VoxAI");
  const [number, onChangeNumber] = React.useState("");

  const [inputMessage, setInputMessage] = React.useState("");

  const handleTextInput = (newText) => {
    onChangeText(newText);
    setInputMessage(newText);
    console.log(text);
  };

  const handleButtonPress = () => {
    console.log("Button pressed");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#070A12",
        flex: 1,
      }}
    >
      <ChatNav />

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Result will be here</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          onChangeText={handleTextInput}
          style={styles.input}
          value={text}
        />

        <SendButton
          title={
            <SvgUri
              width="40"
              height="35"
              fill="#181B24"
              uri="https://www.reshot.com/preview-assets/icons/XYEZDVJ8MN/send-up-right-XYEZDVJ8MN.svg"
            ></SvgUri>
          }
          inputMessage={inputMessage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: "68%",
    margin: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#222734",
    padding: 10,
    color: "#a7a7a7",
    paddingLeft: 30,
    left: 10,
    backgroundColor: "#181B24",
    // backgroundColor: "#111728",
  },
});
