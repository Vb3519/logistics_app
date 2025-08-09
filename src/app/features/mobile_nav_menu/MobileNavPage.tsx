// React-icons:
import { MdOutlineSegment } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import { SearchShipment } from '../../../widgets/Header';
import MobileNavMenu from './MobileNavMenu';
import AddShipmentRequestForm from './AddShipmentRequestForm';
import CustomSection from '../../../shared/ui/CustomSection';
import CustomButton from '../../../shared/ui/CustomButton';
import Logo from '../../../widgets/Logo';

interface MobileNavPage_Props {
  isOpened?: boolean;
  handleToggleMobileMenuPage: () => void;
}

const MobileNavPage = (props: MobileNavPage_Props) => {
  const { isOpened, handleToggleMobileMenuPage } = props;

  return (
    <div
      className={`
    fixed top-0 left-0 w-full h-full z-40 bg-layout_primary
    transition-all duration-500 ease-in-out
    transform
    ${
      isOpened
        ? 'translate-y-0 opacity-100 visible'
        : '-translate-y-full opacity-0 invisible'
    }
    flex flex-col gap-4 overflow-y-auto lg:hidden
  `}
    >
      <div className="invisible p-2 flex justify-between gap-4 flex-wrap xs:px-4 lg:hidden">
        <Logo />

        <div className="flex items-center gap-2">
          <CustomButton
            className="p-2 flex items-center justify-center bg-element_primary sm:p-3"
            onClick={() => {
              handleToggleMobileMenuPage();
            }}
          >
            <MdOutlineSegment className="text-[#7B57DF] text-xl" />
          </CustomButton>
        </div>
      </div>

      <SearchShipment className="flex xs:mx-4 lg:hidden" />

      <div className="flex flex-col gap-4 sm:flex-row sm:mx-4">
        {/* -------------- Навигация: -------------- */}
        <MobileNavMenu />

        {/* -------------- Форма создания заявки на отгрузку: -------------- */}
        <AddShipmentRequestForm />
      </div>

      {/* -------------- Секция (Свободный Транспорт) -------------- */}
      {/* -------------- Секция (Свободный Транспорт) -------------- */}
      {/* -------------- Секция (Свободный Транспорт) -------------- */}
      <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
        <div className="text-sm flex justify-between gap-2 lg:text-base">
          <h2 className="font-semibold lg:text-lg">Свободный транспорт</h2>

          <CustomButton className="flex items-center text-[#7B57DF]">
            Весь список
            <FaAngleRight />
          </CustomButton>
        </div>

        <ul className="flex flex-col gap-2 text-sm lg:text-base">
          <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
            <div className="w-full flex flex-col gap-1">
              <p className="font-semibold">v435322</p>
              <p>Санкт-Петербург - Москва</p>
            </div>
            <div className="w-full flex flex-col justify-end">
              <p className="text-right">
                <span className="text-amber-300">90</span> / 100%
              </p>
              <div className="h-1 bg-amber-200"></div>
            </div>
          </li>

          <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
            <div className="w-full flex flex-col gap-1">
              <p className="font-semibold">v435322</p>
              <p>Санкт-Петербург - Москва</p>
            </div>
            <div className="w-full flex flex-col justify-end">
              <p className="text-right">
                <span className="text-amber-300">90</span> / 100%
              </p>
              <div className="h-1 bg-amber-200"></div>
            </div>
          </li>

          <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
            <div className="w-full flex flex-col gap-1">
              <p className="font-semibold">v435322</p>
              <p>Санкт-Петербург - Москва</p>
            </div>
            <div className="w-full flex flex-col justify-end">
              <p className="text-right">
                <span className="text-amber-300">90</span> / 100%
              </p>
              <div className="h-1 bg-amber-200"></div>
            </div>
          </li>
        </ul>
      </CustomSection>
    </div>
  );
};

export default MobileNavPage;
