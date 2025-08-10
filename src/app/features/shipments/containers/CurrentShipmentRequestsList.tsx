import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// React-icons:
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';
import ShipmentRequestListItem from '../elements/ShipmentRequestsListItem';

// Types:
import { ShipmentRequest } from '../../../../shared/utils/createShipmentRequest';

// Api:
import { SHIPMENTS_URL } from '../../../../shared/api/logistics_appApi';

// State:
import { toggleMobileNavPage } from '../../../redux/slices/mobileNavMenuSlice';

interface CurrentShipmentRequestsList_Props {
  title: string;
}

const CurrentShipmentRequestsList: React.FC<
  CurrentShipmentRequestsList_Props
> = ({ title }) => {
  const dispatch = useDispatch();

  const [currentShipmentRequests, setCurrentShipmentRequests] = useState<
    ShipmentRequest[]
  >([]);

  const loadCurrentShipmentRequests = async (url: string) => {
    try {
      const currentShipmentRequestsResponse: Response = await fetch(url, {
        method: 'GET',
      });

      if (currentShipmentRequestsResponse.ok) {
        const curentShipmentsRequestsData: ShipmentRequest[] =
          await currentShipmentRequestsResponse.json();

        setCurrentShipmentRequests((prevData) => {
          return [...prevData, ...curentShipmentsRequestsData];
        });

        console.log('Загруженные заявки:', curentShipmentsRequestsData);
      } else {
        const errorMsg: string = `HTTP Error: ${currentShipmentRequestsResponse.statusText} ${currentShipmentRequestsResponse.status}`;
        console.log(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);
    }
  };

  const handleToggleMobileMenuPage = () => {
    dispatch(toggleMobileNavPage());
  };

  useEffect(() => {
    if (currentShipmentRequests.length === 0) {
      loadCurrentShipmentRequests(SHIPMENTS_URL);
    }
  }, []);

  const min_items_to_render: number = 3;
  const listPlaceholdersCounter: number =
    min_items_to_render - currentShipmentRequests.length;

  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="text-sm flex justify-between gap-2 lg:text-base">
        <h3 className="font-semibold text-[#7B57DF] title-shadow text-base">
          {title}
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
      {/* h-52 */}
      <ul className="max-h-56 flex flex-col gap-2 text-sm overflow-y-auto lg:text-base">
        {currentShipmentRequests.map((shipmentInfo) => {
          return (
            <ShipmentRequestListItem
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
              className="p-4 min-h-16 flex gap-2 border-b-2 border-b-gray-200"
            >
              <div className="text-secondary flex items-center">...</div>
            </li>
          );
        })}
      </ul>
    </CustomSection>
  );
};

export default CurrentShipmentRequestsList;
