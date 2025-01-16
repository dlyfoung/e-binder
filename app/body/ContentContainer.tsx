import React, { useContext } from "react";
import { ContentContext } from "../ContentContext";
import Message from "./Message";
import Reader from "./Reader";

export default function ContentContainer() {
  const contentMode = useContext(ContentContext);
  return contentMode === "read" ? <Reader /> : <Message />;
}
