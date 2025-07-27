// React-icons:
import {
  BsBoxSeamFill,
  BsThreeDots,
  BsExclamationCircle,
} from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { MdOutlinePersonOutline } from 'react-icons/md';

// Ui:
import CustomButton from '../shared/ui/CustomButton';
import Logo from './Logo';

const SideBarNav = () => {
  return (
    <aside className="hidden min-h-screen flex-col gap-4 justify-between bg-white container-shadow xs:rounded-br-md lg:flex xl:ml-10 xl:rounded-b-md 2xl:ml-16">
      <div className="p-4 flex flex-col gap-4 border-b-2 border-gray-200">
        <Logo />

        <ul className="flex flex-col gap-1">
          <li className="ml-0.5 p-2 flex gap-2 items-center text-gray-400">
            <BsExclamationCircle className="text-xl" />
            <p>Запросы</p>
            <div className="ml-auto w-8 h-8 flex items-center justify-center bg-gray-200 rounded-sm">
              3
            </div>
          </li>

          <li className="p-2 flex gap-2 items-center text-gray-400">
            <IoIosNotificationsOutline className="text-2xl" />
            <p>Уведомления</p>
            <div className="ml-auto w-8 h-8 flex items-center justify-center bg-gray-200 rounded-sm">
              15
            </div>
          </li>
        </ul>
      </div>

      <div className="h-full p-4 flex flex-col justify-between border-b-2 border-gray-200">
        <nav>
          <ul className="flex flex-col gap-4 text-gray-400">
            <li className="p-2 flex items-center gap-2 bg-gray-200 rounded-r-sm border-l-3 border-[#7B57DF]">
              <RiHomeSmile2Line className="text-2xl flex-shrink-0 text-[#7B57DF]" />
              <p className="text-black">Главная</p>
            </li>
            <li className="ml-1 p-2 flex items-center gap-2">
              <FaTruck className="text-xl flex-shrink-0" />
              <p>Отгрузки</p>
            </li>
            <li className="ml-1 p-2 flex items-center gap-2">
              <BsBoxSeamFill className="text-xl flex-shrink-0" />
              <p>Посылки</p>
            </li>
            <li className="ml-0.5 p-2 flex items-center gap-2">
              <MdOutlinePersonOutline className="text-2xl flex-shrink-0" />
              <p>Клиенты</p>
            </li>
          </ul>
        </nav>

        <CustomButton className="hidden py-2 px-4 bg-[#7B57DF] text-[whitesmoke] text-sm xs:block">
          + Создать Заявку
        </CustomButton>
      </div>

      <div className="p-4 flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-[50%] bg-gray-200 flex-shrink-0">
          <MdOutlinePersonOutline className="text-2xl flex-shrink-0 text-gray-500" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Имя Фамилия</div>
          <div className="text-sm text-gray-500">Менеджер</div>
        </div>
        <BsThreeDots className="ml-auto text-gray-500" />
      </div>
    </aside>
  );
};

export default SideBarNav;
