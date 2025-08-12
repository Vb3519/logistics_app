import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// React-icons:
import { FaAngleRight } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';
import ShipmentRequestsListItem from '../elements/ShipmentRequestsListItem';

// Types:
import { ShipmentRequest } from '../../../../types/shipments.interface';
import { AppDispatch } from '../../../redux/store';

// Api:
import { SHIPMENTS_URL } from '../../../../shared/api/logistics_appApi';

// State:
import { toggleMobileNavPage } from '../../../redux/slices/mobileNavMenuSlice';
import {
  loadCurrentShipmentRequestsData,
  selectCurrentShipmentRequests,
  selectIsShipmentsDataLoading,
} from '../../../redux/slices/shipmentsSlice';

const CurrentShipmentRequestsList = () => {
  const dispatch: AppDispatch = useDispatch();

  const currentShipmentRequests = useSelector(selectCurrentShipmentRequests);
  const isShipmentsDataLoading: boolean = useSelector(
    selectIsShipmentsDataLoading
  );

  const handleLoadCurrentShipmentRequestsData = (url: string) => {
    dispatch(loadCurrentShipmentRequestsData(url));
  };

  useEffect(() => {
    if (currentShipmentRequests.length === 0 && !isShipmentsDataLoading) {
      handleLoadCurrentShipmentRequestsData(SHIPMENTS_URL);
    }
  }, []);

  const min_items_to_render: number = 3;
  const listPlaceholdersCounter: number =
    min_items_to_render - currentShipmentRequests.length;

  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="text-sm flex justify-between gap-2 lg:text-base">
        <h3 className="font-semibold text-[#7B57DF] title-shadow text-base">
          Текущие заявки
        </h3>

        <NavLink
          to="shipments"
          className="flex items-center gap-1 text-base text-[#7B57DF]"
        >
          Отгрузки
          <FaAngleRight className="mt-[1px]" />
        </NavLink>
      </div>

      <ul className="grid grid-rows-3 gap-2 text-sm overflow-y-auto lg:text-base">
        {currentShipmentRequests.map((shipmentInfo) => {
          return (
            <ShipmentRequestsListItem
              key={shipmentInfo.id}
              shipment_number={shipmentInfo.shipment_number}
              from_city={shipmentInfo.from_city}
              to_city={shipmentInfo.to_city}
              current_load_value={shipmentInfo.current_load_value}
              max_load_value={shipmentInfo.max_load_value}
            />
          );
        })}

        {Array.from({ length: listPlaceholdersCounter }).map((_, index) => {
          return (
            <li
              key={index}
              className="p-2 flex gap-2 border-b-2 border-b-gray-200 bg-gray-100 rounded-md sm:p-4 sm:min-h-19"
            >
              <div className="flex items-center gap-3 text-secondary">
                <BsClockHistory className="text-2xl text-secondary/30" />
                <p className="text-secondary/60">
                  Ожидается заявка на отгрузку
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </CustomSection>
  );
};

export default CurrentShipmentRequestsList;
