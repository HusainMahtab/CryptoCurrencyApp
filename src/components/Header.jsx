import React from 'react'
import {HStack,Button} from '@chakra-ui/react'
import {Link} from "react-router-dom"
function Header() {
  return (
    <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'} >
       <Button variant={'unstyled'} color={'white'} mx={'2'}  css={{"&:hover":{
          border:" 0.5px solid blue"}}} w={"fit-content"} p={'2'} borderRadius={'12'}>
         <Link to='/'>Home</Link>
       </Button>
       <Button variant={'unstyled'} color={'white'}  mx={'2'} css={{"&:hover":{
          border:" 0.5px solid blue"}}} w={"fit-content"} p={'2'} borderRadius={'12'}>
         <Link to='/coins'>Coins</Link>
       </Button>
       <Button variant={'unstyled'} color={'white'}  mx={'2'} css={{"&:hover":{
          border:" 0.5px solid blue"}}} w={"fit-content"} p={'2'} borderRadius={'12'}>
         <Link to='/exchanges'>ExchangeCoins</Link>
       </Button>
       
    </HStack>
  )
}

export default Header