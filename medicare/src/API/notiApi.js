
import clientNoti from "./clientNoti";


export const getNoti = async ()=>{

    const res = await clientNoti.get("/get-noti");

    return res.data.data.notifications;

}


export const addNoti = async(notiData)=>{
    const res = await clientNoti.post("/add-noti" , notiData)
    return res.data.message;
}


export const deleteNoti = async(notiId)=>{
    const res = await clientNoti.delete(`/delete-noti/${notiId}`);
    return res.data.message;
}


export const clearNoti = async()=>{
    const res = await clientNoti.delete("/clear-noti");
    return res.data.message;
}