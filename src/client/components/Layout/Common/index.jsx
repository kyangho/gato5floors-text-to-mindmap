import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container } from '@mui/material';

export default function CommonLayout() {
  return (
    <>
      <Header />
      <Container>
        <div className="h-screen">
          <Outlet />
        </div>
      </Container>
    </>
  );
}
