import { View, Text } from 'react-native'
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native'

import { s } from './styles'
import { Info } from '@/components/market/info'

export type PropsDetails = {
  name: string
  description: string
  phone: string
  address: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

type Props = {
  data: PropsDetails
}

export function Details({ data }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>

        <Info 
          icon={IconTicket} 
          description={`${data.coupons} cupons disponíveis`} 
        />
        <Info 
          icon={IconMapPin} 
          description={data.address} 
        />
        <Info 
          icon={IconPhone} 
          description={data.phone}
        />
        
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>

        {data.rules.map(rule => (
          <Text 
            style={s.rule}
            key={rule.id} 
          >
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  )
}