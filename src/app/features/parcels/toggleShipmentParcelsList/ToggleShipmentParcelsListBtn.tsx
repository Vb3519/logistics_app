import { useDispatch } from 'react-redux';

// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// Types:
import { AppDispatch } from 'app/redux/store';

// State:
import { toggleShipmentParcelsList } from 'app/redux/slices/shipmentParcelsListSlice';

// Ui:
import CustomButton from 'shared/ui/CustomButton';

const ToggleShipmentParcelsListBtn = () => {
  const dispatch: AppDispatch = useDispatch();

  // Отображение списка посылок, добавленных к непроведенной заявке на отгрузку:
  const handleToggleShipmentParcelsList = () => {
    dispatch(toggleShipmentParcelsList());
  };

  return (
    <CustomButton
      className="p-2 w-40 flex gap-2 items-center justify-center text-[#7B57DF] bg-element_primary xl:w-45"
      onClick={handleToggleShipmentParcelsList}
    >
      <BsBoxSeamFill />
      <span className="text-nowrap">Список посылок</span>
    </CustomButton>
  );
};

export default ToggleShipmentParcelsListBtn;
