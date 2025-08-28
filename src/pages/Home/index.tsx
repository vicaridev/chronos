import { CountDown } from "./CountDown";
import { Form } from "./Form";
import { Container } from "../../components/Container";



export const Home = () => {
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