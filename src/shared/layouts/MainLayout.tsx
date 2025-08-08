import { Outlet } from 'react-router-dom';

// Ui:
import SideBarNav from '../../widgets/SideBarNav';
import Header from '../../widgets/Header';
import Footer from '../../widgets/Footer';

const MainLayout = () => {
  return (
    <div className="font-[inter] bg-layout_primary lg:grid lg:grid-cols-[1fr_4fr]">
      <SideBarNav />

      <div className="flex flex-col gap-4 justify-between xl:mr-6 2xl:mr-25">
        <Header />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
