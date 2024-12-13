import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },

  content:{
    gap: 16,
    padding: 24,
    paddingBottom: 100
  },

  indicator: {
    height: 4,
    width: 80,
    backgroundColor: colors.gray[300]
  },

  title: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
    marginBottom: 16
  },
  
})