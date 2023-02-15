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
import { getCurrentDate, validateSlotTime } from "../miscellaneous/misc";
import { getDocAvailability } from "../miscellaneous/dataFetching";
const BookingPage = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [docId, setDocId] = useState("r02911631078449922");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const params = useParams();
  const toast = useToast();
  useEffect(() => {
    setLoading(true);
    getDocAvailability({ doc_id: docId, slot_date: date })
      .then((res) => {
        setSlots(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleToggleAll = (value) => {
    const toggledData = slots.map((el) => {
      return { ...el, is_available: value };
    });
    setSlots(toggledData);
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
          <RadioGroup onChange={handleToggleAll} isDisabled={!validateSlotTime(inputRef?.current?.value)}>
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
        <Slots data={slots} setSlots={setSlots} />
      )}
    </Box>
  );
};

export default BookingPage;
