// React-icons:
import { FaTruck } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { MdOutlinePersonOutline } from 'react-icons/md';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';

const MobileNavMenu = () => {
  return (
    <CustomSection className="bg-section_primary xs:mx-4 sm:mx-0 sm:w-full">
      <nav className="flex flex-col gap-2">
        <h3 className="font-semibold text-[#7B57DF] title-shadow">
          Разделы приложения:
        </h3>
        <ul className="flex flex-col gap-2 xs:gap-4">
          <li className="group p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <RiHomeSmile2Line className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
            <span>Главная</span>
          </li>
          <li className="group p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <FaTruck className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
            <span>Отгрузки</span>
          </li>
          <li className="group p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <IoIosNotificationsOutline className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
            <span>Посылки</span>
          </li>
          <li className="group p-2 flex items-center gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md text-primary transition delay-200 ease-in cursor-pointer xs:p-4 hover:text-[#7B57DF] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <MdOutlinePersonOutline className="text-2xl text-secondary transition delay-200 ease-in group-hover:text-[#7B57DF]" />
            <span>Клиенты</span>
          </li>
        </ul>
      </nav>
    </CustomSection>
  );
};

export default MobileNavMenu;
