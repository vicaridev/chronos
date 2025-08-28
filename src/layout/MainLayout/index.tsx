import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Container } from "../../components/Container";




export const MainLayout = () => {
  return (
    <Container>
      <Container>
        <Header />
      </Container>
      <Container>
        <Outlet />
      </Container>
      <Container>
        <Footer />
      </Container>
    </Container>

  );
};