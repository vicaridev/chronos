import { CountDown } from "./CountDown";
import { Form } from "./Form";
import { Container } from "../../components/Container";
import { useEffect } from "react";



export const Home = () => {
  useEffect(() => {
    document.title = 'Timer';
  }, []);
  return (
    <Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <Form />
      </Container>
    </Container>
  );
};