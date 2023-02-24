import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Slots from "../components/slots";
import { getCurrentDate, validateSlotTime } from "../miscellaneous/functions";
import {
  getDocAvailability,
  updateAllSlotAvailability,
} from "../miscellaneous/dataFetching";
import EmptySlots from "../components/emptySlots";
const BookingPage = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [docId, setDocId] = useState("r9f3d1675399892487");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const params = useParams();
  const toast = useToast();
  const fetcDocData=(docId,date)=>{
    setLoading(true);
    getDocAvailability({ doc_id: docId, slot_date: date })
    .then((res) => {
      setSlots(res);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setSlots([]);
      setLoading(false);
    });
  }
  useEffect(() => {
    fetcDocData(docId,date)
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleToggleAll = (value) => {
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
    setLoading(true)
    updateAllSlotAvailability({
      doc_id: docId,
      slot_date: date,
      is_available: +value,
    })
      .then((res) => {
        setLoading(false)
        toast({
          description: "status updated",
          duration: 1500,
          status: "success",
          isClosable: "true",
        });
        fetcDocData(docId,date)
        // const toggledData = slots.map((el) => {
        //   return { ...el, is_available: value };
        // });
        // setSlots(toggledData);
      })
      .catch((err) => {
        setLoading(false)
        toast({
          description: "Something went wrong",
          duration: 1500,
          status: "error",
          isClosable: "true",
        });
      });
  };

  return (
    <Box m="auto" mt={5} p={2} alignItems="center" justifyContent={"center"}>
      <Text fontWeight={"bold"} fontSize="3xl" m={5}>
        List of Slots
      </Text>
      <Box w="50%" m="auto">
        <Input
          border={"1px solid black"}
          onChange={handleDateChange}
          value={date}
          type={"date"}
          size="sm"
          ref={inputRef}
        />
      </Box>
      <Flex
        w={"50%"}
        m="auto"
        justifyContent={"space-between"}
        mt={5}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box>
          <Flex alignItems={"center"} gap={2}>
            <Box w={5} h={5} bg="green"></Box>
            <Text>Available</Text>
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <Box w={5} h={5} bg="grey"></Box>
            <Text>Unavailable</Text>
          </Flex>
        </Box>
        <Flex gap={5}>
          <RadioGroup
            onChange={handleToggleAll}
            isDisabled={!validateSlotTime(inputRef?.current?.value)}
          >
            <Stack direction="row">
              <Radio colorScheme={"green"} value="1">
                Available
              </Radio>
              <Radio colorScheme={"gray"} value="0">
                Unavailable
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
      </Flex>
      {loading ? (
        <Spinner mt={20} />
      ) : (
        slots.length>0?<Slots date={date} docId={docId} fetcDocData={fetcDocData}  data={slots} setSlots={setSlots} />:<EmptySlots/>
      )}
    </Box>
  );
};

export default BookingPage;
