import { useDispatch } from 'react-redux';

// State:
import { setSearchShipmentNumber } from '../../../../redux/slices/searchShipmentSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';

const useSetSearchShipmentNumber = () => {
  const dispatch: AppDispatch = useDispatch();

  const setShipmentNumber = (searchShipmentNum: string) => {
    dispatch(setSearchShipmentNumber(searchShipmentNum));
  };

  return { setShipmentNumber: setShipmentNumber };

  // return { setShipmentNumber };
};

export default useSetSearchShipmentNumber;
