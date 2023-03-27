import { Box, Text, Tooltip, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import {
  getDocAvailability,
  updateOneSlotAvailability,
} from "../miscellaneous/docAPIs";
import { validateSlotTime } from "../miscellaneous/functions";

const Slots = ({ data, setSlots, setLoading, docId }) => {
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
    let updatedStatus = status === 0 ? 1 : 0;
    updateOneSlotAvailability({ id: id, is_available: updatedStatus })
      .then((res) => {
        toast({
          description: "Status updated",
          duration: 1500,
          isClosable: true,
          status: "success",
          position: "top",
        });
        setLoading(true);
        getDocAvailability({ doc_id: docId, slot_date: date })
          .then((res) => {
            setLoading(false);
            setSlots(res);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setSlots([]);
          });
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
          "repeat(2,1fr)",
          "repeat(2,1fr)",
          "repeat(4,1fr)",
          "repeat(5,1fr)",
        ]}
        w="50%"
        m="auto"
        mt={8}
        gap="15px"
        ref={ref}
      >
        {data.map((el) => {
          return (
            <Tooltip hasArrow={true} placement="top" label="Click here to toggle status" aria-label='A tooltip'>
              <Box
                key={el.id}
                onClick={() =>
                  handleSatusChange(el.id, el.is_available, el.date)
                }
                cursor={"pointer"}
                p={3}
                w="-webkit-fit-content"
                borderRadius={10}
                color="white"
                bg={el.is_available === 0 ? "grey" : "green"}
                m="auto"
              >
                <Text>{el.date}</Text>
                <Text>{el.time}</Text>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </>
  );
};

export default Slots;
