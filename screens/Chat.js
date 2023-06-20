import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import BackButton from "../components/BackButton";
import { SvgUri } from "react-native-svg";
import ChatNav from "../components/ChatNav";
import SendButton from "../components/SendButton";
import { HeaderBackButton } from "react-navigation-stack";
import { OPENAI_API_KEY } from "@env";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import * as Speech from "expo-speech";

export default function Chat() {
  const [text, onChangeText] = React.useState("Hello VoxAI");
  const [number, onChangeNumber] = React.useState("");
  const [inputMessage, setInputMessage] = React.useState("");
  const [outputMessage, setOutputMessage] = React.useState(
    "Result will be here"
  );
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const scrollViewRef = useRef();

  const handleTextInput = (newText) => {
    onChangeText(newText);
    setInputMessage(newText);
    console.log(text);
  };

  const handleInputFocus = () => {
    onChangeText("");
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleButtonPress = () => {
    console.log("Button pressed");
    Keyboard.dismiss();
    if (
      inputMessage.toLowerCase().startsWith("generate image") ||
      inputMessage.toLowerCase().startsWith("создай фото") ||
      inputMessage.toLowerCase().startsWith("cтвори фото")
    ) {
      generateImages();
    } else {
      generateText();
    }
  };

  const generateText = () => {
    console.log("Button pressed");
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [message])
    );
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
        setInputMessage("");
        setOutputMessage(data.choices[0].message.content.trim());
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: data.choices[0].message.content.trim(),
          createdAt: new Date(),
          user: { _id: 2 },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [message])
        );
        options = {};
        Speech.speak(data.choices[0].message.content, options);
      });
    onChangeText("");
    setIsInputFocused(false);
  };

  const generateImages = () => {
    console.log("Button pressed");
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [message])
    );
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
        setInputMessage("");
        data.data.forEach((item) => {
          const message = {
            _id: Math.random().toString(36).substring(7),
            text: "Image generated",
            createdAt: new Date(),
            user: { _id: 2 },
            image: item.url,
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [message])
          );
        });
      });
    onChangeText("");
    setInputMessage("");
    setIsInputFocused(false);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#D6FFFF",
          },
          left: {
            backgroundColor: "#181B24",
          },
        }}
        textStyle={{
          right: {
            color: "#181B24",
            paddingTop: 4,
          },
          left: {
            color: "#fff",
            paddingTop: 4,
          },
        }}
      />
    );
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
          flex: 3,
          justifyContent: "flex-start",
          marginRight: 11,
          marginLeft: -30,
        }}
      >
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{ _id: 1 }}
          minInputToolbarHeight={0}
          renderBubble={renderBubble}
          timeTextStyle={{
            left: {},
            right: { color: "#181B24" },
          }}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            onChangeText={handleTextInput}
            onFocus={handleInputFocus}
            style={[
              styles.input,
              {
                color: "#fff",
              },
            ]}
            value={inputMessage}
            placeholder="Hello VoxAI"
            placeholderTextColor="#a7a7a7"
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
      </KeyboardAvoidingView>
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
