import api from "./api";

export const getNotifications = () => {
  return api.get("/notifications");
};

export const markNotificationRead = (id) => {
  return api.put(`/notifications/${id}`);
};

export const createNotification = (data) => {
  return api.post("/notifications", data);
};