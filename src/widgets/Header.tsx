// React-icons:
import { MdOutlineSegment } from 'react-icons/md';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

// Ui:
import CustomButton from '../shared/ui/CustomButton';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="flex flex-col gap-2 xs:px-4 lg:mt-4">
      <div className="p-2 flex justify-between gap-4 flex-wrap lg:hidden">
        <Logo />

        <div className="flex items-center gap-2">
          <CustomButton className="hidden py-2 px-4 bg-[#7B57DF] text-[whitesmoke] text-sm xs:block">
            + Создать Заявку
          </CustomButton>

          <CustomButton className="p-2 flex items-center justify-center bg-gray-200">
            <MdOutlineSegment className="text-[#7B57DF] text-xl" />
          </CustomButton>
        </div>
      </div>

      <section className="p-2 flex items-center justify-between gap-2 text-sm bg-white container-shadow xs:p-4 xs:rounded-md lg:text-base">
        <form className="w-full max-w-95 p-2 flex gap-1 items-center bg-gray-100 rounded-sm">
          <PiMagnifyingGlassBold className="text-2xl text-gray-300" />
          <input
            className="w-full outline-none"
            placeholder="Номер заказа..."
          />
        </form>

        <div className="font-semibold flex flex-col gap-1">
          <p className="text-nowrap">Сб, 26.07.25</p>
          <p>16:45</p>
        </div>
      </section>
    </header>
  );
};

export default Header;
