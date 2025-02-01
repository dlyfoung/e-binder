import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
});

export default function Header({ children }: HeaderProps) {
  return <View style={styles.header}>{children}</View>;
}

interface HeaderProps {
  children?: ReactNode;
}
