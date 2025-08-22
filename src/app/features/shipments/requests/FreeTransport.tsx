import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

// React-icons:
import { FaAngleRight } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';
import ActiveRequestsListElem from './loadRequestsData/elements/ActiveRequestsListElem';

// State:
import { selectShipmentRequests } from '../../../redux/slices/shipmentsSlice';
import { toggleMobileNavPage } from '../../../redux/slices/mobileNavMenuSlice';

// Constants:
import { MIN_FREE_TRANSPORT_ELEMS_TO_RENDER } from '../../../../constants/logisticAppContants';

const FreeTransport = () => {
  const dispatch = useDispatch();

  const shipmentRequests = useSelector(selectShipmentRequests);

  const handleToggleMobileMenuPage = () => {
    dispatch(toggleMobileNavPage());
  };

  const listPlaceholdersCounter: number =
    MIN_FREE_TRANSPORT_ELEMS_TO_RENDER - shipmentRequests.length;

  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="text-sm flex justify-between gap-2">
        <h3 className="font-semibold text-[#7B57DF] title-shadow">
          Свободный транспорт
        </h3>

        <NavLink
          to="shipments"
          className="flex items-center gap-1 text-[#7B57DF]"
          onClick={handleToggleMobileMenuPage}
        >
          Отгрузки
          <FaAngleRight className="mt-[1px]" />
        </NavLink>
      </div>

      <ul className="py-2 max-h-58 flex flex-col gap-2 text-sm overflow-y-auto">
        {shipmentRequests.map((shipmentInfo) => {
          return (
            <ActiveRequestsListElem
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
              className="p-2 min-h-20 flex gap-2 border-b-2 border-b-gray-200 bg-gray-100 rounded-md sm:p-4"
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

export default FreeTransport;
