// React-icons:
import { PiMagnifyingGlassBold } from 'react-icons/pi';

interface SearchShipment_Props {
  className: string;
}

// Model:
import useSetSearchShipmentNumber from '../model/useSetSearchShipmentNumber';
import useNavigateToShipmentPage from '../model/useNavigateToShipmentPage';

export const SearchShipment: React.FC<SearchShipment_Props> = ({
  className,
}) => {
  const { setShipmentNumber } = useSetSearchShipmentNumber();
  const { navigateToShipmentPage, searchShipmentNumber } =
    useNavigateToShipmentPage();

  // Пользовательский ввод значения номера заявки на отгрузку:
  const handleSetSearchShipmentNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShipmentNumber(event.target.value);
  };

  // Навигация на страницу отгрузки / пустую страницу:
  const handleNavigateToShipmentPage = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    navigateToShipmentPage(searchShipmentNumber);
  };

  return (
    <section
      className={`${
        className ? className : ''
      } p-2 justify-between gap-2 text-sm bg-section_primary container-shadow xs:p-4 xs:rounded-md xl:text-base`}
    >
      <form
        className="w-full max-w-95 p-2 flex gap-1 items-center bg-element_primary rounded-sm"
        onSubmit={handleNavigateToShipmentPage}
      >
        <PiMagnifyingGlassBold className="text-2xl text-gray-300" />
        <input
          className="w-full outline-none"
          placeholder="Номер отгрузки..."
          value={searchShipmentNumber}
          onChange={handleSetSearchShipmentNumber}
        />
      </form>

      <div className="hidden font-semibold flex-col gap-1">
        <p className="text-nowrap">Сб, 26.07.25</p>
        <p>16:45</p>
      </div>
    </section>
  );
};

export default SearchShipment;
