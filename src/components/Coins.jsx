import React from 'react'
import {Container,VStack,Image,HStack,Heading,Text,Button,RadioGroup, Radio,Alert,AlertIcon} from '@chakra-ui/react'
import { useEffect } from 'react'
import axios from 'axios'
import { server } from '../main'
import { useState } from 'react'
import Loader from './Loader'
import {Link} from 'react-router-dom'
function Coins() {
     const [coins,setCoins]=useState([])
     const [ loading,setLoading]=useState(true)
     const [currency,setCurrency]=useState('inr')
     const [error,setError]=useState(false)
     const [page,setPage]=useState(1)
    
     const currencySymbol=currency==='inr' ? "₹" : currency==='eur' ? "€" : "$"       

    useEffect(()=>{

      
      const fetchCoins=async()=>{
        try {
          const {data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
          setCoins(data)
          console.log(data)
          setLoading(false)
          // setPage(2)
        } catch (error) {
          console.log('error while fetching coin URL',error)
          setError(true)
        }
         
      }

      fetchCoins()
       
    },[currency,page])

    const handleNext=(page)=>{
      console.log('next============>', page)
      setPage((prev) => prev + 1)
      console.log('after=========>', page)
      
      setLoading(true)
      
    }

    const handlePrevious=(page)=>{
      console.log('previous=====>', page)
      setPage((prev) => prev-1)
      
      setLoading(true)
    }

    if(error) return <ErrorCoin message={"error while fetching Coin URL data"}/>
     
    

  return (  
      <Container maxW={'container.xl'}>
      {
        loading ? (<Loader/>) : (

         <>
           <RadioGroup value={currency} onChange={setCurrency} p={'8'} justifyContent={'space-around'} >
              <HStack w={'100%'} justifyContent={'center'} py={'2'}>
                 <Heading>Select Currency</Heading>
              </HStack>
              
               <HStack spacing={'4'} width={'100%'} justifyContent={'center'}>
                
                 <Radio value={'inr'}>INR</Radio>
                 <Radio value={'usd'}>USD</Radio>
                 <Radio value={'eur'}>EUR</Radio>
               </HStack>
           </RadioGroup>

           <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map((i)=>(
            <CoinsCard 
            id={i.id}
            name={i.name} 
            img={i.image} 
            currencySymbol={currencySymbol}
            price={i.current_price}
            rank={i.market_cap_rank}
             
            key={i.id}
            />
         
            ))}
            
           </HStack>
          </>
         )
       }   
       
       <HStack w={'100%'} justifyContent={'space-between'} p={'4'}>        
        <Button onClick={handlePrevious} 
         bg={'black'} 
         color={'wheat'}
         shadow={'lg'} 
         p={'4'} 
         borderRadius={'lg'}
         transition={'all 0.3s'} 
         m={'4'}
         css={{"&:hover":{
          backgroundColor:"purple"}}}
         >
         Previous
         </Button>

        <Button 
         onClick={handleNext} 
         bg={'black'} 
         color={'white'} 
         shadow={'lg'} 
         p={'4'} 
         borderRadius={'lg'}
         transition={'all 0.3s'} 
         m={'4'}
         css={{"&:hover":{
          backgroundColor:"blue"}}}
        >
        Next</Button>
       </HStack>
       
    
    </Container>

   
    
  )
}

const CoinsCard=({name,img,rank,id,price,currencySymbol})=>{
  return(
    <Link to={`/coin/${id}`} target={'blank'}>
      <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{"&:hover":{
        transform:"scale(1.1)"
      }}}>
        <Image src={img} w='10' h='10' objectFit={'contain'} alt='exchange'/>
        <Heading size={'md'} noOfLines={1}>{`${currencySymbol} ${price}`}</Heading>
        <Heading size={'md'} noOfLines={1}>{`Rank ${rank}`}</Heading>
        <Text noOfLines={1}>{name}</Text>

      </VStack>

    </Link>
  )
 
}

const ErrorCoin=({message})=>{
    return (
      <HStack w={'100%'} justifyContent={'center'} >
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

export default Coins