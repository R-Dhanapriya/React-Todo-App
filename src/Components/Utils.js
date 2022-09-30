import { toast } from "react-toastify";

export const ShowMessage = (type, message) => {
  return toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
