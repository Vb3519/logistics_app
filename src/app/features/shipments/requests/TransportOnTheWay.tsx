import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// React-icons:
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';

// Data:
import { transportOnTheWayData } from '../../../../shared/data/shipmentsData';

// Services:
import loadShipmentsLogData from '../services/loadShipmentsLogData';

// State:
import {
  selectShipmentsLogData,
  selectIsShipmentsLogDataLoading,
} from '../../../redux/slices/shipmentsLogSlice';

// Api:
import { SHIPMENTS_URL } from '../../../../shared/api/logistics_appApi';

// Types:
import { AppDispatch } from '../../../redux/store';

const TransportOnTheWay = () => {
  const dispatch: AppDispatch = useDispatch();

  const shipmentsLogData = useSelector(selectShipmentsLogData);
  const isShipmentsLogDataLoading = useSelector(
    selectIsShipmentsLogDataLoading
  );

  useEffect(() => {
    if (shipmentsLogData.length === 0 && !isShipmentsLogDataLoading) {
      dispatch(
        loadShipmentsLogData({
          url: SHIPMENTS_URL,
          param: '?is_shipment_status_set=true',
        })
      );
    }
  }, []);

  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="flex justify-between gap-2 text-sm xl:text-base">
        <h2 className="font-semibold text-[#7B57DF] title-shadow">
          Транспорт в пути
        </h2>

        <NavLink
          to="shipments/all"
          className="flex items-center gap-1 text-[#7B57DF]"
        >
          Весь список
          <FaAngleRight className="mt-0.5" />
        </NavLink>
      </div>

      <div className="h-full flex overflow-x-auto">
        <table className="w-full text-center flex-1 text-sm xl:text-base">
          <thead className="bg-element_primary">
            <tr>
              <th className="p-2 rounded-l-md text-primary">Адрес</th>
              <th className="p-2 text-primary">Автомобиль</th>
              <th className="p-2 rounded-r-md text-primary">Опоздание</th>
            </tr>
          </thead>

          <tbody>
            {shipmentsLogData.map((shipmentData, index) => {
              const isTransportLate: boolean =
                shipmentData.shipment_status === 'Опаздывает' ? true : false;

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

            <LogPlaceholdersContainer
              counter={3 - shipmentsLogData.length}
              isShipmentsLogDataLoading={isShipmentsLogDataLoading}
            />
          </tbody>
        </table>
      </div>
    </CustomSection>
  );
};

export default TransportOnTheWay;

// Ряд таблицы:
// --------------------------------------------
interface TransportOnTheWayTableRow_Props {
  from_city: string;
  to_city: string;
  transport: string;
  isTransportLate: boolean;
  shipment_status: string | undefined;
}

const TransportOnTheWayTableRow: React.FC<TransportOnTheWayTableRow_Props> = (
  props
) => {
  const { from_city, to_city, transport, isTransportLate, shipment_status } =
    props;

  return (
    <tr className="h-18 p-2 border-b-2 border-gray-200">
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

// ----------------------------------------------------------------------------
// Лоадеры:
// ----------------------------------------------------------------------------

// Контейнер для плейсхолдеров:
interface LogPlaceholdersContainer_Props {
  counter: number;
  isShipmentsLogDataLoading: boolean;
}
const LogPlaceholdersContainer: React.FC<LogPlaceholdersContainer_Props> = ({
  counter,
  isShipmentsLogDataLoading,
}) => {
  return Array.from({ length: counter }).map((_, index) => {
    return (
      <LogSkeleton key={index} isDataLoading={isShipmentsLogDataLoading} />
    );
  });
};

interface LogSkeleton_Props {
  isDataLoading: boolean;
}

const LogSkeleton: React.FC<LogSkeleton_Props> = ({ isDataLoading }) => {
  const emptyTitles: string[] = ['-', '-', '-'];

  return (
    <tr
      className={`h-18 p-2 border-b-2 border-gray-200 ${
        isDataLoading && 'animate-pulse'
      }`}
    >
      {emptyTitles.map((emptyEl, index) => {
        return (
          <td key={index} className="p-2 text-secondary font-bold">
            {emptyEl}
          </td>
        );
      })}
    </tr>
  );
};
