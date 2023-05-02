import { Container } from "./styles";
//Component

import ToastMessage from "../ToastMessage";
import useToastContainer from "./useToastContainer";

const ToastContainer = () => {
  const { messages, handleRemoveMessage } = useToastContainer();
  return (
    <Container>
      {messages.map(({ id, text, type, duration = 5000 }) => (
        <ToastMessage
          duration={duration}
          key={id}
          id={id}
          text={text}
          type={type}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
