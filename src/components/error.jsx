import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {MdOutlineErrorOutline} from "react-icons/md"
const Error = () => {
  return (
    <Flex gap={5} flexDirection={"column"} justifyContent="center" alignItems={"center"} mt={3}>
      <Text textAlign={"center"}>Oops! Something went wrong</Text>
      <MdOutlineErrorOutline size={60} color="grey"/>
    </Flex>
  )
}

export default Error
