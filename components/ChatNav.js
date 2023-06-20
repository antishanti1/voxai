import { SafeAreaView, Text, View, Image } from "react-native";
import BackButton from "./BackButton";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

export default function ChatNav() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#070A12",
      }}
    >
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <BackButton
          onPress={handleButtonPress}
          title={
            <SvgUri
              width="20"
              height="20"
              fill={"#FFF"}
              uri="https://img.uxwing.com/wp-content/themes/uxwing/download/arrow-direction/line-angle-left-icon.svg"
            ></SvgUri>
          }
        />

        <View
          style={{
            gap: 5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontFamily: "RubikMedium",
            }}
          >
            VoxAI
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgUri
              width="10"
              height="10"
              fill={"#00e500"}
              uri="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/circle-icon.svg"
            ></SvgUri>
            <Text
              style={{
                color: "#a7a7a7",
                fontSize: 10,
              }}
            >
              Online
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#181B24",
            borderRadius: 100,
            right: 20,
          }}
        >
          <Image
            source={require("../assets/images/avatar.png")}
            style={{
              height: 60,
              width: 60,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
