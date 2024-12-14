import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },

  title: {
    color: colors.gray[500],
    fontFamily: fontFamily.semiBold,
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14
  },

  content: {
    flexDirection: "row",
    backgroundColor: colors.green.soft,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 10,
    alignItems: "center"
  },

  code: {
    color: colors.gray[600],
    fontFamily: fontFamily.semiBold,
    fontSize: 16
  }
})