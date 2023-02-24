import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {TbMoodEmpty} from "react-icons/tb"
const EmptySlots = () => {
  return (
    <Flex gap={5} flexDirection={"column"} justifyContent="center" alignItems={"center"} mt={3} >
       <Text textAlign={"center"}>Sorry, slots is not available for selected date.</Text>
       <Box>
        <TbMoodEmpty size={60} color="grey"/>
       </Box>
    </Flex>
  )
}

export default EmptySlots
