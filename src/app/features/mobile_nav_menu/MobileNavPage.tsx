// React-icons:
import { MdOutlineSegment } from 'react-icons/md';

// Ui:
import { SearchShipment } from '../../../widgets/Header';
import MobileNavMenu from './MobileNavMenu';
import AddShipmentRequestForm from './AddShipmentRequestForm';
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
      className={`${
        isOpened ? 'active-menu' : 'hidden-menu'
      } fixed left-0 w-full h-full flex-col gap-4 bg-layout_primary lg:hidden`}
    >
      <div className="p-2 flex justify-between gap-4 flex-wrap xs:px-4 lg:hidden">
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
    </div>
  );
};

export default MobileNavPage;
