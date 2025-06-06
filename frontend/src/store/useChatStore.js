import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstanace.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log('get User')
      toast.error(error.response.data.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstanace.get(`/message/${userId}`);
      set({ messages: res.data});

    } catch (error) {
      console.log('Error in getMessages');
      console.log(error.response.data.messages);
      toast.error(error.response.data.messages);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessages: async (messageData)=>{
    const {selectedUser,messages}=get();
    try {
      const res=await axiosInstanace.post(`/message/send/${selectedUser._id}`,messageData);
      set({messages:[...messages,res.data]});
    } catch (error) {
        console.log('Error in send message')
      toast.error(error.response.data.message);
    }
  },
  subscriptToMessages:()=>{
    const {selectedUser}=get();
    if(!selectedUser) return;
    const socket=useAuthStore.getState().socket;
    //todo:Optimize this one later 
    socket.on("newMessage",(newMessage)=>{
      const isMessageSendFromSelectedUser=newMessage.senderId===selectedUser._id;
      if(!isMessageSendFromSelectedUser) return;
      set({
        messages:[...(get().messages || []),newMessage]
      });
    });
  },
  unsubcriptFromMessages:()=>{
    const socket=useAuthStore.getState().socket;

    socket.off("newMessage");
  },
  //todo:Optimize this one later 
  setSelectedUser:(selectedUser)=>set({selectedUser}),
}));
