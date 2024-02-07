import React, { useEffect, useState } from 'react'
import 
 {
  Box, 
  Container,
   RadioGroup,
   Radio,
   Alert,
   AlertIcon,
   HStack, 
   VStack,
   Text,
   Image,
   Stat,
   StatLabel,
   StatNumber,
   StatArrow,
   StatHelpText,
   Badge,
   Progress,
   Button,
   
  }
    from "@chakra-ui/react"

import Loader from './Loader'
import axios from "axios"
import { server } from '../main'
import { useParams } from 'react-router-dom'
import Chart from './Chart'

function CoinDetails() {
  const [coin,setCoin]=useState({})
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(false)
  const [currency,setCurrency]=useState('inr')
  const [days,setDays]=useState("24h")
  const [chartArr,setChartArr]=useState([])
  const params=useParams();

  const currencySymbol=currency==='inr' ? "₹" : currency==='eur' ? "€" : "$"

  const btns=["24h","7d","14d","30d","60d","200d","365d","max"]

  const switchCharStats=(key)=>{
       if(key==="24h"){
          setDays("24h")
          setLoading(true)
       }else if(key==="7d"){
         setDays("7d")
         setLoading(true)
       }else if(key==="14d"){
         setDays("14d")
         setLoading(true)
       }else if(key==="30d"){
        setDays("30d")
        setLoading(true)
       }else if(key==="60d"){
         setDays("60d")
         setLoading(true)
       }else if(key==="200d"){
        setDays("200d")
        setLoading(true)
       }else if(key==="1year"){
        setDays("365d")
        setLoading(true)
       }else if(key==="max"){
        setDays("max")
        setLoading(true)
       }else{
        setDays("24h")
        setLoading(true)
       }
  }

  useEffect(()=>{
      const fetchCoin=async()=>{
        try {
          const responce=await axios.get(`${server}/coins/${params.id}`)
         
          const {data:chartData}=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
          // console.log(chartData)
          setChartArr(chartData.prices)
          
          setCoin(responce.data)
          
          // console.log(responce);
          setLoading(false)
          
        } catch (error) {
          console.log("error while fetching data",error)
          setError(true)
        }
      } 
      fetchCoin()
  },[params.id],currency,days)

   if (error) return <ErrorComponents message={"Error while Fetching Coin Details..."}/>

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? (<Loader/>) : (
         
         <>
          <Box width={'full'} borderWidth={1}>
             <Chart arr={chartArr} currency={currencySymbol} days={days}/>
          </Box>

          <HStack p={"4"} wrap={"wrap"}>
              {
                btns.map((i)=>(
                  <Button key={i} onClick={()=>switchCharStats(i)}>{i}</Button>
                ))
              }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'} justifyContent={'space-around'}>
            <Radio value={'inr'} p={'2'}>INR</Radio>
            <Radio value={'usd'} p={'2'}>USD</Radio> 
            <Radio value={'eur'} p={'2'}>EUR</Radio> 
          </RadioGroup>


          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
               <Text fontSize={'small'} alignSelf="center" opacity={0.7}>
                 Last Updated On {Date().split("G")[0]}
               </Text>

              <Image src={coin.image.large} alt={coin.name} w={'16'} h={'16'} objectFit={"contain"}/>

              <Stat>
                <StatLabel>
                   {coin.name}
                </StatLabel>

                <StatNumber>
                   {currencySymbol} {coin.market_data.current_price[currency]}
                </StatNumber>
              </Stat>

                 <Stat>
                  <StatHelpText>
                    <StatArrow type={
                      coin.market_data.price_change_percentage_24h > 0? "increase" : "decrease"
                       }/>
                      {coin.market_data.price_change_percentage_24h}% 
                   </StatHelpText>

                </Stat>

              <Badge fontSize={'2xl'}  backgroundColor={'blackAlpha.900'} color={'white'}>
                  {`#${coin.market_cap_rank}`}
              </Badge>  

              <CustomBar high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`} low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}/>       
               
               <Box w={'full'} p={'4'}>
                   <Item title={"Max Supply"} value={coin.market_data.max_supply ===null ? "data is not Avaialble" :[coin.market_data.max_supply] } /> 
                   <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
                   <Item title={"Market Cap"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}/>
                   <Item title={"All Time High"} value={`${currencySymbol} ${coin.market_data.ath[currency]}`}/>
                   <Item title={"All Time Low"} value={`${currencySymbol} ${coin.market_data.atl[currency]}`}/>
                   
 
               </Box>

          </VStack>
         </>

        )
      }
    </Container>
  )
}

const ErrorComponents=({message})=>{
   return(
    <HStack w={'100%'} justifyContent={'center'} alignItems={'center'}>
    <Alert 
    status='error' 
    h={'20vh'}
    my={'20'}
    w={'60%'}
    >
    <AlertIcon/>
    {message}
    </Alert>
   </HStack>
   )
}

 const CustomBar=({high,low})=>{
  return(
    <VStack w={'full'}>
       <Progress value={50} colorScheme='teal' w={'full'}/>
       <HStack justifyContent={'space-between'} w={'full'}>
           <Badge children={low} colorScheme='red'/>
           <Text fontSize={'small'}>24H Range</Text>
           <Badge children={high} colorScheme='green'/>
       </HStack>
    </VStack>
  )
 }

 const Item=({title,value})=>{
    return(
      <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
         <Text fontFamily={'Bebas Neus'} letterSpacing={'widest'}>
          {title}
         </Text>
         <Text>
         {value}
         </Text>
      </HStack>
     
    )
 }

export default CoinDetails