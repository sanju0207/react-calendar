import { Box, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { validateSlotTime } from "../miscellaneous/misc";

const Slots = ({ data, setSlots }) => {
  const toast = useToast();
  const handleSatusChange = (id, status, date) => {
    if (!validateSlotTime(date)) {
      toast({
        description: "Action denied",
        duration: 1500,
        isClosable: true,
        status: "error",
      });
      return;
    }
    let updatedStatus = status == 0 ? 1 : 0;
    const updatedSlots = data.map((el) => {
      if (id == el.id) {
        return { ...el, is_available: updatedStatus };
      }
      return el;
    });
    setSlots(updatedSlots);
    toast({
      description: "Status updated",
      duration: 1500,
      isClosable: true,
      status: "success",
    });
  };
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={["repeat(3,1fr)","repeat(3,1fr)","repeat(3,1fr)","repeat(4,1fr)"]}
      w="70%"
      m="auto"
      mt={5}
      gap="15px 15px"
    >
      {data.map((el) => {
        return (
          <Box
            key={el.id}
            onClick={() =>
              handleSatusChange(el.id, el.is_available, el.date)
            }
            cursor={"pointer"}
            bg={el.is_available == 0 ? "grey" : "green"}
          >
            <Text>{el.date}</Text>
            <Text>{el.time}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Slots;
