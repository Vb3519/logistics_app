import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// React-icons:
import { FaTruck } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { MdOutlinePersonOutline } from 'react-icons/md';

// Ui:
import CustomSection from '../shared/ui/CustomSection';

// State:
import { toggleMobileNavPage } from '../app/redux/slices/mobileNavMenuSlice';

const MobileNavMenu = () => {
  const dispatch = useDispatch();

  const handleToggleMobileMenuPage = () => {
    dispatch(toggleMobileNavPage());
  };

  return (
    <CustomSection className="bg-section_primary xs:mx-4 sm:mx-0 sm:w-full">
      <nav className="h-full flex flex-col gap-2 text-sm">
        <h3 className="font-semibold text-[#7B57DF] title-shadow">
          Разделы приложения
        </h3>

        <ul className="h-full flex flex-col gap-2 xs:gap-4">
          <li className="flex-1">
            <NavLink
              to="/"
              className="group h-full p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
              onClick={handleToggleMobileMenuPage}
            >
              <RiHomeSmile2Line className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
              <span>Главная</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              to="shipments"
              className="group h-full p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
              onClick={handleToggleMobileMenuPage}
            >
              <FaTruck className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
              <span>Отгрузки</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              to="parcels"
              className="group h-full p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
              onClick={handleToggleMobileMenuPage}
            >
              <IoIosNotificationsOutline className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
              <span>Посылки</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              to="clients"
              className="group h-full p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
              onClick={handleToggleMobileMenuPage}
            >
              <MdOutlinePersonOutline className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
              <span>Клиенты</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </CustomSection>
  );
};

export default MobileNavMenu;
