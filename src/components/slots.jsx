import { Box, Text, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { getDocAvailability, updateOneSlotAvailability } from "../miscellaneous/dataFetching";
import { validateSlotTime } from "../miscellaneous/functions";

const Slots = ({ data, setSlots, setLoading, docId }) => {
  console.log(docId)
  const toast = useToast();
  const ref = useRef(null);
  const handleSatusChange = (id, status, date) => {
    if (!validateSlotTime(date)) {
      toast({
        description: "Action denied",
        duration: 1500,
        isClosable: true,
        status: "error",
        position: "top",
      });
      return;
    }
    let updatedStatus = status == 0 ? 1 : 0;
    updateOneSlotAvailability({ id: id, is_available: updatedStatus })
      .then((res) => {
        toast({
          description: "Status updated",
          duration: 1500,
          isClosable: true,
          status: "success",
          position: "top",
        });
        setLoading(true)
        getDocAvailability({doc_id:docId, slot_date:date}).then((res)=>{
          setLoading(false)          
          setSlots(res)
        }).catch((err)=>{
          console.log(err)
          setLoading(false)
          setSlots([])
        })
      })
      .catch((err) => {
        toast({
          description: "Something went wrong",
          duration: 1500,
          status: "error",
          isClosable: "true",
        });
      });
  };

  return (
    <>
      <Box
        display={"grid"}
        gridTemplateColumns={[
          "repeat(3,1fr)",
          "repeat(3,1fr)",
          "repeat(3,1fr)",
          "repeat(4,1fr)",
        ]}
        w="70%"
        m="auto"
        mt={5}
        gap="15px 15px"
        ref={ref}
      >
        {data.map((el) => {
          return (
            <Box
              key={el.id}
              onClick={() => handleSatusChange(el.id, el.is_available, el.date)}
              cursor={"pointer"}
              py={2}
              borderRadius={10}
              color="white"
              bg={el.is_available == 0 ? "grey" : "green"}
            >
              <Text>{el.date}</Text>
              <Text>{el.time}</Text>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Slots;
