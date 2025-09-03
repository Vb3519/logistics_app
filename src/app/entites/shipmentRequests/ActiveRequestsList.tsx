import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// React-icons:
import { FaAngleRight } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import ActiveRequestsListElem from './ActiveRequestsListElem';

// Types:
import { AppDispatch } from '../../redux/store';
import { ShipmentStatus } from '../../../types/shipments.interface';

// Api:
import {
  SHIPMENTS_URL,
  ACTIVE_SHIPMENTS_URL,
} from '../../../shared/api/logistics_appApi';

// State:
import { toggleMobileNavPage } from '../../redux/slices/mobileNavMenuSlice';

import {
  selectShipmentRequests,
  selectisShipmentRequestsDataLoading,
} from '../../redux/slices/shipmentsSlice';

// Services:
import loadShipmentRequestsData from '../../services/shipments/loadShipmentRequestsData';

// Constants:
import { MIN_SHIPMENT_REQUESTS_TO_RENDER } from '../../../shared/constants/logisticAppContants';

const ActiveRequestsList = () => {
  const dispatch: AppDispatch = useDispatch();

  const shipmentRequests = useSelector(selectShipmentRequests);
  const isShipmentRequestsDataLoading: boolean = useSelector(
    selectisShipmentRequestsDataLoading
  );

  const handleLoadShipmentRequestsData = (url: string) => {
    dispatch(loadShipmentRequestsData(url));
  };

  useEffect(() => {
    if (shipmentRequests.length === 0 && !isShipmentRequestsDataLoading) {
      handleLoadShipmentRequestsData(ACTIVE_SHIPMENTS_URL);
    }
  }, []);

  const listPlaceholdersCounter: number =
    MIN_SHIPMENT_REQUESTS_TO_RENDER - shipmentRequests.length;

  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="text-sm flex justify-between gap-2 xl:text-base">
        <h3 className="font-semibold text-[#7B57DF] title-shadow">
          Текущие заявки
        </h3>

        <NavLink
          to="shipments"
          className="flex items-center gap-1 text-[#7B57DF]"
        >
          Отгрузки
          <FaAngleRight className="mt-[1px]" />
        </NavLink>
      </div>

      <ul className="h-full grid grid-rows-3 gap-2 text-sm overflow-y-auto xl:text-base">
        {shipmentRequests
          .slice(0, MIN_SHIPMENT_REQUESTS_TO_RENDER)
          .map((shipmentRequestInfo) => {
            return (
              <ActiveRequestsListElem
                key={shipmentRequestInfo.id}
                shipment_number={shipmentRequestInfo.shipment_number}
                from_city={shipmentRequestInfo.from_city}
                to_city={shipmentRequestInfo.to_city}
                current_load_value={shipmentRequestInfo.current_load_value}
                max_load_value={shipmentRequestInfo.max_load_value}
              />
            );
          })}

        {Array.from({ length: listPlaceholdersCounter }).map((_, index) => {
          return (
            <li
              key={index}
              className={`p-2 min-h-20 flex gap-2 border-b-2 border-b-gray-200 bg-gray-100 rounded-md ${
                isShipmentRequestsDataLoading ? 'animate-pulse' : null
              } sm:p-4`}
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

export default ActiveRequestsList;
