import axios from "axios";

export const getDocAvailability = async (payload) => {
  return await axios.post(
    `https://kapiva.app/api/get_doc_availibility.php?p=setmore_availability`,payload)
    .then((res)=>{
          return getCustomData(res.data.response)
    })
};


const getCustomData=(data)=>{
    const customData=data.map((el)=>{
        const timeData=el.slot_date_time.split(" ")
        const date=timeData[0]
        const time=timeData[1]
        return {...el,time:time,date:date}
    })
    return customData
}