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
import { OPENAI_API_KEY } from "@env";
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat() {
  const [text, onChangeText] = React.useState("Hello VoxAI");
  const [number, onChangeNumber] = React.useState("");
  const [inputMessage, setInputMessage] = React.useState("");
  const [outputMessage, setOutputMessage] = React.useState(
    "Result will be here"
  );

  const [messages, setMessages] = React.useState([]);

  const handleTextInput = (newText) => {
    onChangeText(newText);
    setInputMessage(newText);
    console.log(text);
  };

  const handleButtonPress = () => {
    console.log("Button pressed");
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        max_tokens: 150,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: inputMessage }],
        model: "gpt-3.5-turbo",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        setOutputMessage(data.choices[0].message.content.trim());
      });
  };
  const generateImages = () => {
    console.log("Button pressed");
    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: inputMessage,
        n: 2,
        size: "1024x1024",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0].url);
        setOutputMessage(data.data[0].url);
      });
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
        <Text style={{ color: "#fff" }}>{outputMessage}</Text>
        <GiftedChat messages={messages} renderInputToolbar={() => {}} />
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
          handleButtonPress={handleButtonPress}
          generateImages={generateImages}
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
