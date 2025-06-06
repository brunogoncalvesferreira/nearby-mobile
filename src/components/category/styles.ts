import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme"

export const s = StyleSheet.create({
  container: {
   height: 36,
   backgroundColor: colors.gray[100],
   borderWidth: 1,
   borderColor: colors.gray[300],
   borderRadius: 8,
   justifyContent: "center",
   alignItems: "center",
   paddingHorizontal: 12,
   gap: 10,
   flexDirection: "row"
  },

  name: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },

  containerSelected: {
    backgroundColor: colors.green.base,
    borderColor: colors.green.base,
  },

  nameSelected: {
    color: colors.gray[100],
  }
})