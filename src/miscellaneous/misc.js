export const getCurrentDate = () => {
    let date = new Date();
    let formatedDate = date.getFullYear()+ "-" +(date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1))+ "-" +(date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) 
    return formatedDate
  };

export const validateSlotTime=(date)=>{
   let currDate=getCurrentDate()
   console.log(currDate,date)
   if(currDate>date)
   {
     return false
   }
   return true
}  
