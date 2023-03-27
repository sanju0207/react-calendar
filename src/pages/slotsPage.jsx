import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Slots from "../components/slots";
import { getCurrentDate, validateSlotTime } from "../miscellaneous/functions";
import {
  getDocAvailability,
  updateAllSlotAvailability,
} from "../miscellaneous/docAPIs";
import EmptySlots from "../components/emptySlots";
import Error from "../components/error";
const SlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [docId, setDocId] = useState("");
  const [error, SetError] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const params = useParams();


  const toast = useToast();
  const fetcDocData = (docId, date) => {
    setLoading(true);
    getDocAvailability({ doc_id: docId, slot_date: date })
      .then((res) => {
        if (res === "No data found") {
          setSlotsError(true);
          setLoading(false);
          setSlots([]);
          return;
        }
        if (res === "Parameters missing") {
          SetError(true);
          setLoading(false);
          setSlots([]);
          return;
        }
        setSlotsError(false);
        setSlots(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSlots([]);
        setLoading(false);
      });
  };
  useEffect(() => {
    setDocId(params.id);
    fetcDocData(params.id, date);
  }, [date, params]);

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
    setLoading(true);
    updateAllSlotAvailability({
      doc_id: docId,
      slot_date: date,
      is_available: +value,
    })
      .then((res) => {
        setLoading(false);
        toast({
          description: "status updated",
          duration: 1500,
          status: "success",
          isClosable: "true",
        });
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
        setLoading(false);
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
      <Box w="40%" m="auto">
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
        w={["70%", "70%", "50%", "50%"]}
        m="auto"
        justifyContent={"space-between"}
        mt={5}
        alignItems={["center", "center", "", ""]}
        gap={[3, 3, 0, 0]}
        flexDirection={["column", "column", "row", "row"]}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
        p={6}
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
          <Button
            isDisabled={!validateSlotTime(inputRef?.current?.value)}
            onClick={()=>handleToggleAll(1)}
            _hover={"none"}
            color={"white"}
            bg={"rgb(0,128,0)"}
          >
            Available
          </Button>
          <Button
            isDisabled={!validateSlotTime(inputRef?.current?.value)}
            _hover={"none"}
            color={"white"}
            bg={"rgb(128,128,128)"}
            onClick={()=>handleToggleAll(0)}
          >
            Unavailable
          </Button>
          {/* <RadioGroup
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
          </RadioGroup> */}
        </Flex>
      </Flex>
      {loading ? (
        <Spinner mt={20} />
      ) : error ? (
        <Error />
      ) : slots.length > 0 ? (
        <Slots
          setLoading={setLoading}
          docId={docId}
          data={slots}
          setSlots={setSlots}
        />
      ) : slotsError ? (
        <EmptySlots />
      ) : null}
    </Box>
  );
};

export default SlotsPage;
