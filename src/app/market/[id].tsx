import { Alert, Modal, View, StatusBar, ScrollView } from 'react-native'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { api } from '@/services/api'
import { useEffect, useState, useRef } from 'react'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details, type PropsDetails } from '@/components/market/details'
import { Coupon } from '@/components/market/coupon'

import { Button } from '@/components/button'

import { useCameraPermissions, CameraView } from 'expo-camera'

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  const [ _, requestPermission ] = useCameraPermissions()

  const params = useLocalSearchParams<{ id: string}>()

  const qrLock = useRef(false)

  const [coupon, setCoupon] = useState<string | null>(null)
  const [data, setData] = useState<DataProps>()

  const [isLoading, setIsLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [couponIsFetching, setCouponFetching] = useState(false)

  async function fetchMarket() {
    try {
      
      const { data } = await api.get(`/markets/${params.id}`)

      setData(data)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        { 
          text: "OK", 
          onPress: () => router.back() 
        },
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if(!granted) {
        return Alert.alert("Câmera", "Você precisa permitir acesso a câmera")
      }

      qrLock.current = false
      setIsVisibleCameraModal(true)
      
    } catch (error) {
      console.log(error)
      Alert.alert("Câmera", "Não foi possivel abrir a camera")
    }
  }

  async function getCoupon(id: string) {
    try {

      setCouponFetching(true)

      const { data } = await api.patch(`/coupons/${id}`)

      Alert.alert("Coupom", data.coupon)
      setCoupon(data.coupon)

    } catch (error) {
      console.log(error)
      Alert.alert("Coupom", "Não foi possivel utilizar o cupom")
    } finally {
      setCouponFetching(false)
    }
  }

  function handleUseCoupom(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel",text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) }
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if(isLoading) {
    return <Loading />
  }

  if(!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        hidden={isVisibleCameraModal}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover}/>
        <Details data={data}/>
        {coupon && <Coupon code={coupon}/>}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>

        <CameraView 
          style={{ flex: 1 }} 
          facing='back'
          onBarcodeScanned={({ data }) => {

            if(data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupom(data), 500 )
            }

          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32 , right: 32 }}>
          <Button 
            onPress={() => setIsVisibleCameraModal(false)} 
            isLoading={couponIsFetching}
          >
            <Button.Title>Fechar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}