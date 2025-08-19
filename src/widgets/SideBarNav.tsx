import { NavLink } from 'react-router-dom';

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
    <aside className="hidden min-h-screen flex-col gap-4 justify-between bg-section_primary container-shadow xs:rounded-br-md lg:flex xl:ml-10 xl:rounded-b-md 2xl:ml-29">
      <div className="p-4 flex flex-col gap-4 border-b-2 border-gray-200">
        <Logo />

        <ul className="flex flex-col gap-1 text-sm xl:text-base">
          <li className="ml-0.5 p-2 flex gap-2 items-center text-secondary">
            <BsExclamationCircle className="text-xl" />
            <p>Запросы</p>
            <div className="ml-auto w-8 h-8 flex items-center justify-center bg-element_primary rounded-sm">
              3
            </div>
          </li>

          <li className="p-2 flex gap-2 items-center text-secondary">
            <IoIosNotificationsOutline className="text-2xl" />
            <p>Уведомления</p>
            <div className="ml-auto w-8 h-8 flex items-center justify-center bg-element_primary rounded-sm">
              15
            </div>
          </li>
        </ul>
      </div>

      <div className="h-full p-4 flex flex-col justify-between border-b-2 border-gray-200">
        <nav>
          <ul className="flex flex-col gap-4 text-secondary text-sm xl:text-base">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'group p-2 flex items-center gap-2 bg-element_primary rounded-r-sm border-l-3 border-[#7B57DF]'
                    : 'group p-2 flex items-center gap-2 rounded-r-sm transition duration-200 ease-in hover:bg-element_primary border-l-3 border-transparent hover:border-gray-300'
                }
              >
                {({ isActive }) => (
                  <>
                    <RiHomeSmile2Line
                      className={`text-2xl flex-shrink-0 ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    />
                    <span
                      className={`transition duration-200 ease-in group-hover:text-black ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    >
                      Главная
                    </span>
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="shipments"
                className={({ isActive }) =>
                  isActive
                    ? 'group p-2 flex items-center gap-2 bg-element_primary rounded-r-sm border-l-3 border-[#7B57DF]'
                    : 'group p-2 flex items-center gap-2 rounded-r-sm transition duration-200 ease-in hover:bg-element_primary border-l-3 border-transparent hover:border-gray-300'
                }
              >
                {({ isActive }) => (
                  <>
                    <FaTruck
                      className={`ml-1 text-xl flex-shrink-0 ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    />
                    <span
                      className={`transition duration-200 ease-in group-hover:text-black ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    >
                      Отгрузки
                    </span>
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="parcels"
                className={({ isActive }) =>
                  isActive
                    ? 'group p-2 flex items-center gap-2 bg-element_primary rounded-r-sm border-l-3 border-[#7B57DF]'
                    : 'group p-2 flex items-center gap-2 rounded-r-sm transition duration-200 ease-in hover:bg-element_primary border-l-3 border-transparent hover:border-gray-300'
                }
              >
                {({ isActive }) => (
                  <>
                    <BsBoxSeamFill
                      className={`ml-1 text-xl flex-shrink-0 ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    />
                    <span
                      className={`transition duration-200 ease-in group-hover:text-black ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    >
                      Посылки
                    </span>
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="clients"
                className={({ isActive }) =>
                  isActive
                    ? 'group p-2 flex items-center gap-2 bg-element_primary rounded-r-sm border-l-3 border-[#7B57DF]'
                    : 'group p-2 flex items-center gap-2 rounded-r-sm transition duration-200 ease-in hover:bg-element_primary border-l-3 border-transparent hover:border-gray-300'
                }
              >
                {({ isActive }) => (
                  <>
                    <MdOutlinePersonOutline
                      className={`ml-1 text-2xl flex-shrink-0 ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    />
                    <span
                      className={`transition duration-200 ease-in group-hover:text-black ${
                        isActive && 'text-[#7B57DF]'
                      }`}
                    >
                      Клиенты
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        <CustomButton className="hidden py-2 px-4 bg-[#7B57DF] text-[whitesmoke] text-sm xl:text-base xs:block">
          + Создать Заявку
        </CustomButton>
      </div>

      <div className="p-4 flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-[50%] bg-element_primary flex-shrink-0">
          <MdOutlinePersonOutline className="text-2xl flex-shrink-0 text-primary" />
        </div>
        <div className="flex flex-col text-sm xl:text-base">
          <div className="font-semibold">Имя Фамилия</div>
          <div className="text-sm text-primary">Менеджер</div>
        </div>
        <BsThreeDots className="ml-auto text-primary" />
      </div>
    </aside>
  );
};

export default SideBarNav;
