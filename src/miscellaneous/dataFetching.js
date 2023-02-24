import axios from "axios";
export const getDocAvailability = async (payload) => {
  return await axios
    .post(
      `http://localhost/setmore_availability/api/get_doc_availibility.php?p=setmore_availability`,
      payload
    )
    .then((res) => {
      return getCustomData(res.data.response);
    }).catch((err)=>{
      return err
    })
};
export const updateOneSlotAvailability = async (payload) => {
  return await axios.post("http://localhost/setmore_availability/api/get_doc_availibility.php?p=update_availability", payload).then((res) => {
    return res
  }).catch((err)=>{
    return err
  })
};
export const updateAllSlotAvailability = async (payload) => {
  return await axios.post("http://localhost/setmore_availability/api/get_doc_availibility.php?p=update_all", payload).then((res) => {
    return res
  }).catch((err)=>{
    return err
  })
};
const getCustomData = (data) => {
  const customData = data.map((el) => {
    const timeData = el.slot_date_time.split(" ");
    const date = timeData[0];
    const time = timeData[1];
    return { ...el, time: time, date: date };
  });
  return customData;
};