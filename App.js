import Postcode from "@actbase/react-daum-postcode";
import axios from "axios";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [viewFind, setViewFind] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientZonecode, setClientZonecode] = useState("");

  const URL = "http://118.46.5.236:80/html/api/event/evt_export.php";
  useEffect(() => {}, []);

  const getlocation = () => {
    return (
      <>
        <View>
          <TouchableOpacity
            onPress={() => {
              setViewFind(false);
              console.log("back");
            }}
          >
            <Text>뒤로가기</Text>
          </TouchableOpacity>
        </View>
        <Postcode
          style={{ width: 320, height: "80%" }}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={(data) => {
            try {
              //setLocationInfo(JSON.stringify(data));
              //console.log("locationInfo : ", locationInfo);

              setClientAddress(data.address);
              console.log("clientAddress : ", clientAddress);
              setClientZonecode(data.zonecode);
              console.log("clientZonecode : ", clientZonecode);
              setViewFind(false);
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
  const onChangeName = (event) => {
    console.log(event);
    setClientName(event);
    console.log(clientName);
  };
  const onChangePhone = (event) => {
    setClientPhone(event);
    console.log(clientPhone);
  };

  const submitMungDeel = async () => {
    //api 가져오기
    console.log("mung deel");

    await axios({
      url: URL,
      method: "POST",
      data: {
        name: clientName,
        phone: clientPhone,
        addr: clientAddress,
        p_name: "로얄캐닌",
        mb_id: "user01",
      },
    })
      .then(function (response) {
        alert(response.data.message);
        console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View>
        {viewFind === true ? (
          <View>{getlocation()}</View>
        ) : (
          <View>
            <Text>아래 정보를 입력하세요</Text>
            <TextInput
              placeholder="이름"
              onChangeText={onChangeName}
              value={clientName}
            ></TextInput>
            <TextInput
              placeholder="핸드폰번호"
              onChangeText={onChangePhone}
              value={clientPhone}
            ></TextInput>
            <TextInput
              placeholder="주소"
              editable={false}
              value={clientAddress}
            ></TextInput>
            <TextInput
              placeholder="우편번호"
              editable={false}
              value={clientZonecode}
            ></TextInput>
            <TouchableOpacity>
              <Text style={styles.button} onPress={onPressBtn}>
                주소찾기
              </Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity>
                <Text style={styles.button} onPress={submitMungDeel}>
                  제출하기
                </Text>
              </TouchableOpacity>
            </View>
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
  button: {
    backgroundColor: "skyblue",
    margin: 20,
  },
});
