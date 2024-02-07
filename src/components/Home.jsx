import React from 'react'
import {Box,Image,Text} from "@chakra-ui/react"
import {motion} from "framer-motion"
import btcImage from '../assets/crypto2.jpg'
function Home() {
  return (
    <Box bgColor={"black"} w={"full"} h={"95vh"} >
       
       <motion.div style={{
          height:"80vh",
       }}
        animate={{
          translateY:"30px",
        }}
        transition={{
          duration:2,
          repeat:Infinity,
          repeatType:"reverse"
        }}
       >
         <Image w={"full"} h={"full"} objectFit={"contain"} src={btcImage} />
       </motion.div>

      <Text 
        fontSize={"6xl"} 
        textAlign={"center"}
        fontWeight={"thin"} 
        color={"whiteAlpha.700"}
        // mt={""}
        >
        Xcrypto</Text>
    </Box>
  )
}

export default Home