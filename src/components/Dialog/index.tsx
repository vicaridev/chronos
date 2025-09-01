import type { ToastContentProps } from "react-toastify";
import { Button } from "../Button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import styles from './styles.module.css';

export const Dialog = ({ closeToast, data }: ToastContentProps<string>) => {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>
        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            aria-label="Confirmar ação e fechar"
            title="Confirmar ação e fechar"
          />
          <Button
            onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            aria-label="Confirmar ação e fechar"
            title="Confirmar ação e fechar"
            color="red"
          />
        </div>
      </div>
    </>
  );
}; 