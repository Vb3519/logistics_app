import { NavLink } from 'react-router-dom';

// React-icons:
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';

// Data:
import { transportOnTheWayData } from '../../../../shared/data/shipmentsData';

const TransportOnTheWay = () => {
  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="flex justify-between gap-2 text-sm xl:text-base">
        <h2 className="font-semibold text-[#7B57DF] title-shadow">
          Транспорт в пути
        </h2>

        <NavLink
          to="shipments"
          className="flex items-center gap-1 text-[#7B57DF]"
        >
          Весь список
          <FaAngleRight className="mt-0.5" />
        </NavLink>
      </div>

      <div className="h-full flex">
        <table className="w-full text-center flex-1 text-sm xl:text-base">
          <thead className="bg-element_primary">
            <tr>
              <th className="p-2 rounded-l-md text-primary">Адрес</th>
              <th className="p-2 text-primary">Автомобиль</th>
              <th className="p-2 rounded-r-md text-primary">Опоздание</th>
            </tr>
          </thead>

          <tbody>
            {transportOnTheWayData.map((shipmentData, index) => {
              const isTransportLate: boolean =
                shipmentData.shipment_status === 'Да' ? true : false;

              return (
                <TransportOnTheWayTableRow
                  key={index}
                  from_city={shipmentData.from_city}
                  to_city={shipmentData.to_city}
                  transport={shipmentData.transport}
                  isTransportLate={isTransportLate}
                  shipment_status={shipmentData.shipment_status}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </CustomSection>
  );
};

export default TransportOnTheWay;

interface TransportOnTheWayTableRow_Props {
  from_city: string;
  to_city: string;
  transport: string;
  isTransportLate: boolean;
  shipment_status: string;
}

const TransportOnTheWayTableRow: React.FC<TransportOnTheWayTableRow_Props> = (
  props
) => {
  const { from_city, to_city, transport, isTransportLate, shipment_status } =
    props;

  return (
    <tr className="p-2 border-b-2 border-gray-200">
      <td className="p-2">
        <span>{from_city}</span> - <span>{to_city}</span>
      </td>
      <td className="p-2 text-primary">{transport}</td>
      <td className="p-2 text-primary">
        <span
          className={`px-2 py-1 rounded-md ${
            isTransportLate ? 'bg-[#f6b9b9]' : 'bg-[#d0eac5]'
          }`}
        >
          {shipment_status}
        </span>
      </td>
    </tr>
  );
};
