import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

// React-icons:
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';
import ShipmentRequestsListItem from './ShipmentRequestsListItem';

// State:
import { selectCurrentShipmentRequests } from '../../../redux/slices/shipmentsSlice';
import { toggleMobileNavPage } from '../../../redux/slices/mobileNavMenuSlice';

const FreeTransport = () => {
  const dispatch = useDispatch();

  const currentShipmentRequests = useSelector(selectCurrentShipmentRequests);

  const handleToggleMobileMenuPage = () => {
    dispatch(toggleMobileNavPage());
  };

  const min_items_to_render: number = 3;
  const listPlaceholdersCounter: number =
    min_items_to_render - currentShipmentRequests.length;

  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="text-sm flex justify-between gap-2 lg:text-base">
        <h3 className="font-semibold text-[#7B57DF] title-shadow text-base">
          Свободный транспорт
        </h3>

        <NavLink
          to="shipments"
          className="flex items-center gap-1 text-base text-[#7B57DF]"
          onClick={handleToggleMobileMenuPage}
        >
          Отгрузки
          <FaAngleRight className="mt-[1px]" />
        </NavLink>
      </div>

      <ul className="max-h-58 flex flex-col gap-2 text-sm overflow-y-auto lg:text-base">
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
              className="p-4 flex gap-2 border-b-2 border-b-gray-200"
            >
              <div className="text-secondary flex items-center">...</div>
            </li>
          );
        })}
      </ul>
    </CustomSection>
  );
};

export default FreeTransport;
