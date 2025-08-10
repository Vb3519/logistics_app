// React-icons:
import { MdOutlineSegment } from 'react-icons/md';

// Ui:
import { SearchShipment } from '../../../widgets/Header';
import MobileNavMenu from './MobileNavMenu';
import AddShipmentRequestForm from './AddShipmentRequestForm';
import CustomButton from '../../../shared/ui/CustomButton';
import Logo from '../../../widgets/Logo';
import CurrentShipmentRequests from './CurrentShipmentRequests';

interface MobileNavPage_Props {
  isOpened?: boolean;
  handleToggleMobileMenuPage: () => void;
}

const MobileNavPage = (props: MobileNavPage_Props) => {
  const { isOpened, handleToggleMobileMenuPage } = props;

  return (
    <div
      className={`
    fixed top-0 left-0 pb-4 w-full h-full z-40 bg-layout_primary
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

      {/* -------------- Секция (Текущие заявки на отгрузку) -------------- */}
      <CurrentShipmentRequests />
    </div>
  );
};

export default MobileNavPage;
