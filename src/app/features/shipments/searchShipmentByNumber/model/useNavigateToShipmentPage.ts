import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// State:
import {
  selectSearchShipmentNumber,
  setSearchShipmentNumber,
} from '../../../../redux/slices/searchShipmentSlice';

import { selectShipmentRequests } from '../../../../redux/slices/shipmentsSlice';

import {
  selectIsMobileNavPageOpened,
  toggleMobileNavPage,
} from '../../../../redux/slices/mobileNavMenuSlice';

// Types:
import { ShipmentRequest } from '../../../../../types/shipments.interface';
import { AppDispatch } from '../../../../redux/store';

// Lib:
import findSearchShipmentData from '../lib/findSearchShipmentData';

const useNavigateToShipmentPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const searchShipmentNumber: string = useSelector(selectSearchShipmentNumber);
  const shipmentRequestsData: ShipmentRequest[] = useSelector(
    selectShipmentRequests
  );
  const isMobileNavPageOpened: boolean = useSelector(
    selectIsMobileNavPageOpened
  );

  const searchShipmentData: ShipmentRequest | undefined =
    findSearchShipmentData(shipmentRequestsData, searchShipmentNumber);

  const searchShipmentId: string | undefined = searchShipmentData?.id;

  const navigateToShipmentPage = (searchShipmentNum: string) => {
    if (searchShipmentNum === '') return;

    if (searchShipmentId) {
      navigate(`shipments/${searchShipmentId}`);
    } else {
      navigate(`shipments/not-found`);
    }

    // Если пользователький ввод идет ч/з инпут в мобильном меню - оно будет закрыто:
    if (isMobileNavPageOpened) {
      dispatch(toggleMobileNavPage());
    }

    dispatch(setSearchShipmentNumber(''));
  };

  return {
    navigateToShipmentPage: navigateToShipmentPage,
    searchShipmentNumber: searchShipmentNumber,
  };
  // return { navigateToShipmentPage, searchShipmentNumber };
};

export default useNavigateToShipmentPage;
