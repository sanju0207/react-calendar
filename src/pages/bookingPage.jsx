import React, { useEffect, useState } from "react";
import { Box, Input, Spinner, Text } from "@chakra-ui/react";
import {useParams} from "react-router-dom"
import Slots from "../components/slots";
import { getCurrentDate } from "../miscellaneous/misc";
import { getDocAvailability } from "../miscellaneous/api/getDocAvailability";
const BookingPage = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [docId, setDocId] = useState("r02911631078449922");
  const [loading,setLoading]=useState(false)
  const params=useParams()
  useEffect(() => {
    setLoading(true)
    getDocAvailability({ doc_id: docId, slot_date: date })
      .then((res) => {
         setSlots(res)
         setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }, [date]);

  const handleDateChange=(e)=>{
      setDate(e.target.value)
  } 
  return (
    <Box m="auto" mt={5} p={2} alignItems="center" justifyContent={"center"}>
      <Text fontWeight={"bold"} fontSize="3xl" m={5}>List of Slots</Text>
      <Box w="50%" m="auto">
      <Input border={"1px solid black"} onChange={handleDateChange} value={date} type={"date"} size="sm" />
      </Box>
      {loading? <Spinner mt={20}/>:<Slots data={slots} setSlots={setSlots} />}
    </Box>
  );
};

export default BookingPage;
