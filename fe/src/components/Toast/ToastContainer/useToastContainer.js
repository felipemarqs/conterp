//React
import { useState, useEffect, useCallback } from "react";

//Manager
import { toastEventManager } from "../../../utils/toast";

const useToastContainer = () => {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    };
    toastEventManager.on("addtoast", handleAddToast);
    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) =>
      prevState.filter((message) => message.id !== id)
    );
  }, []);

  return {
    messages,
    handleRemoveMessage
  };
};

export default useToastContainer;