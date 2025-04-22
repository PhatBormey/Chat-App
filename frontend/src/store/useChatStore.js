import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
export const useChatStore = create((set) => ({
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
      toast.error(error.response.data.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstanace.get(`/messsge/${userId}`);
      set({ messages: res.data});

    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  setSelectedUser:(selectedUser)=>set({selectedUser})
}));
