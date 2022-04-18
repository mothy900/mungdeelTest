import { StatusBar } from "expo-status-bar";
import Postcode from "@actbase/react-daum-postcode";

import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [viewFind, setViewFind] = useState(false);
  const [locationInfo, setLocationInfo] = useState({});
  const [clientAddress, setClientAddress] = useState("");
  const [clientZonecode, setClientZonecode] = useState("");

  useEffect(() => {}, []);

  const getlocation = () => {
    return (
      <>
        <Postcode
          style={{ width: 320, height: "80%" }}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={(data) => {
            try {
              setLocationInfo(JSON.stringify(data));
              console.log("locationInfo : ", locationInfo);
              setClientAddress(JSON.parse(locationInfo));
              console.log("clientAddress : ", clientAddress);
              setClientZonecode(JSON.parse(locationInfo).zonecode);
              console.log("clientZonecode : ", clientZonecode);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </>
    );
  };
  const onPressBtn = () => {
    console.log("btn");
    setViewFind(true);
  };
  return (
    <View style={styles.container}>
      <View>
        {viewFind === true ? (
          <View>{getlocation()}</View>
        ) : (
          <View>
            <Text>아래 정보를 입력하세요</Text>
            <TextInput placeholder="이름"></TextInput>
            <TextInput placeholder="핸드폰번호"></TextInput>
            <TextInput
              placeholder="주소"
              editable={false}
              //defaultValue={clientAddress}
            ></TextInput>
            <TextInput
              placeholder="우편번호"
              editable={false}
              //defaultValue={clientZonecode}
            ></TextInput>
            <TouchableOpacity>
              <Text style={styles.button} onPress={onPressBtn}>
                주소찾기
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
