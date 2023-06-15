import { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  Button,
} from "react-native";
import HomeButton from "../components/HomeButton";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate("Chat");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#070A12",
        // backgroundColor: "#0C101D",
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={require("../assets/images/waves.png")}
          style={{
            width: "100%",
            height: "70%",
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/robot4.png")}
            style={{
              width: 350,
              height: 370,
              position: "absolute",
              top: -290,
              left: 18,
            }}
          />
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          top: -70,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "RubikMedium",
            fontSize: 30,
            textAlign: "center",
            width: "80%",
          }}
        >
          How may I help you today?
        </Text>
        <Text
          style={{
            color: "#fff",
            fontFamily: "RubikRegular",
            fontSize: 15,
            textAlign: "center",
            width: "80%",
            top: 10,
          }}
        >
          Harnessing the power of artificial intelligence, our chatbot provides
          personalized and seamless interactions for assistance, support, and
          companionship
        </Text>
      </View>

      <View
        style={{
          top: -20,
        }}
      >
        <HomeButton title="Start a new chat" onPress={handleButtonPress} />
      </View>
    </SafeAreaView>
  );
}
