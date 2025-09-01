import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React-icons:
import { MdOutlineSegment } from 'react-icons/md';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

// Ui:
import MobileNavPage from '../../../pages/MobileNavPage';
import CustomButton from '../../../shared/ui/CustomButton';
import Logo from './Logo';

// State:
import {
  toggleMobileNavPage,
  selectIsMobileNavPageOpened,
} from '../../redux/slices/mobileNavMenuSlice';

const Header = () => {
  const dispatch = useDispatch();

  const isMobileMenuPageOpened: boolean = useSelector(
    selectIsMobileNavPageOpened
  );

  const handleToggleMobileMenuPage = () => {
    dispatch(toggleMobileNavPage());
  };

  // Автозакрытие мобильного меню при ресайзе:
  const handleMobileMenuAutoClose = () => {
    if (isMobileMenuPageOpened && window.innerWidth >= 1024) {
      dispatch(toggleMobileNavPage());
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleMobileMenuAutoClose);

    return () => {
      // При размонтировании компонента - обработчик убирается:
      window.removeEventListener('resize', handleMobileMenuAutoClose);
    };
  }, [isMobileMenuPageOpened]);

  useEffect(() => {
    isMobileMenuPageOpened
      ? document.body.classList.add('mobile-menu-opened')
      : document.body.classList.remove('mobile-menu-opened');
  }, [isMobileMenuPageOpened]);

  return (
    <header className="flex flex-col gap-2 lg:px-4 lg:mt-4">
      <div className="p-2 flex justify-between gap-4 flex-wrap bg-section_primary z-50 xs:px-4 lg:hidden">
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

      <SearchShipment className="hidden lg:flex" />

      <MobileNavPage
        isOpened={isMobileMenuPageOpened}
        handleToggleMobileMenuPage={handleToggleMobileMenuPage}
      />
    </header>
  );
};

export default Header;

interface SearchShipment_Props {
  className: string;
}

export const SearchShipment: React.FC<SearchShipment_Props> = ({
  className,
}) => {
  return (
    <section
      className={`${
        className ? className : ''
      } p-2 justify-between gap-2 text-sm bg-section_primary container-shadow xs:p-4 xs:rounded-md xl:text-base`}
    >
      <form className="w-full max-w-95 p-2 flex gap-1 items-center bg-element_primary rounded-sm">
        <PiMagnifyingGlassBold className="text-2xl text-gray-300" />
        <input
          className="w-full outline-none"
          placeholder="Номер отгрузки..."
        />
      </form>

      <div className="hidden font-semibold flex-col gap-1">
        <p className="text-nowrap">Сб, 26.07.25</p>
        <p>16:45</p>
      </div>
    </section>
  );
};
