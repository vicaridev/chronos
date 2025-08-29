import { Bounce, ToastContainer } from "react-toastify";

type MessageContainerProps = {
  children: React.ReactNode;
};

export const MessageContainer = ({ children }: MessageContainerProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
};