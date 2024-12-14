import { Text, View } from "react-native";
import { IconProps } from "@tabler/icons-react-native";

import { s } from "./styles";
import { colors } from "@/styles/colors";
import type { ComponentType } from "react";

type Props = {
  description: string
  icon: ComponentType<IconProps>
}

export function Info({ description, icon: Icon }: Props) {
  return (
    <View style={s.container}>
      {Icon && <Icon size={24} color={colors.gray[400]} />}
      <Text style={s.text}>{description}</Text>
    </View>
  )
}