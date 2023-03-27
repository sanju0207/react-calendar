import axios from "axios";

export const getDocList=async()=>{
  return await axios.get("https://kapiva.app/api/get_doc_list.php")
}
export const getDocAvailability = async (payload) => {
  return await axios
    .post(
      `https://kapiva.app/api/get_doc_availibility.php?p=setmore_availability`,
      payload
    )
    .then((res) => {
      if(res.data.status===400&&res.data.message==="No data found")
      {
        return Promise.reject("No data found")
      }
      if(res.data.status===400&&res.data.message==="Parameters missing")
      {
        return Promise.reject("Parameters missing")
      }
      return getCustomData(res.data.response);
    }).catch((err)=>{
      return err
    })
};
export const updateOneSlotAvailability = async (payload) => {
  return await axios.post("https://kapiva.app/api/get_doc_availibility.php?p=update_availability", payload).then((res) => {
    return res
  }).catch((err)=>{
    return err
  })
};
export const updateAllSlotAvailability = async (payload) => {
  return await axios.post("https://kapiva.app/api/get_doc_availibility.php?p=update_all", payload).then((res) => {
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