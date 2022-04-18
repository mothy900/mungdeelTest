import React, { useState } from "react";
import Postcode from "@actbase/react-daum-postcode";

export default function postFind() {
  return (
    <Postcode
      style={{ width: 320, height: "80%" }}
      jsOptions={{ animation: true }}
      onSelected={(data) => JSON.stringify(data)}
    />
  );
}
