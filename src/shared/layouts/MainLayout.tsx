import { Outlet } from 'react-router-dom';

// Ui:
import SideBarNav from '../../app/widgets/ui/SideBarNav';
import Header from '../../app/widgets/ui/Header';
import Footer from '../../app/widgets/ui/Footer';

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
