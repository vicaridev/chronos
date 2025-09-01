import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styles from './styles.module.css';
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../reducer/actions/taskActions";

export const Settings = () => {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shorBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessage.dismiss();
    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shorBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage.error('Use somente valores numéricos para configurar o tempo do ciclo');
    }

    if (workTime < 1 || workTime > 99) {
      showMessage.error('Digite valores entre 1 e 99 para foco');
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      showMessage.error('Digite valores entre 1 e 30 para descanso curto');
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      showMessage.error('Digite valores entre 1 e 60 para descanso longo');
    }

    dispatch({
      type: TaskActionsTypes.CHANGE_SETTINGS, payload: {
        workTime,
        shortBreakTime,
        longBreakTime
      }
    });
    showMessage.success('Configurações salvas!');
  };

  useEffect(() => {
    document.title = 'Configurações';
  }, []);
  return (
    <>
      <Container>
        <Heading>
          Configurações
        </Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>Modifique as configurações para tempo de foco,
          desanso curto e descanso longo.</p>
      </Container>
      <Container>
        <form action="" onSubmit={handleSaveSettings} className={styles.form}>
          <div className={styles.formRow}>
            <Input id="workTime" labelText="Foco" ref={workTimeInput} defaultValue={state.config.workTime} type="number" />
          </div>
          <div className={styles.formRow}>
            <Input id="shortBreakTime" labelText="Descanso curto" ref={shorBreakTimeInput} defaultValue={state.config.shortBreakTime} type="number" />
          </div>
          <div className={styles.formRow}>
            <Input id="longBreakTime" labelText="Descanso longo" ref={longBreakTimeInput} defaultValue={state.config.longBreakTime} type="number" />
          </div>
          <div className={styles.formRow}>
            <Button icon={<SaveIcon />} aria-label="Salvar configurações" title="Salvar configurações" />
          </div>
        </form>
      </Container>
    </>
  );
};