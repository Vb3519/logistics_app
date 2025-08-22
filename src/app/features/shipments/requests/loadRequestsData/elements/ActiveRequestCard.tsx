// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Types:
import { ActiveRequestCard_Props } from '../../../../../../types/shipments.interface';

// Utils:
import {
  calcTransportLoad,
  calcTransportLoadProgressColor,
} from '../../../../../../shared/utils/calcTransportLoad';

const ActiveRequestCard: React.FC<ActiveRequestCard_Props> = ({
  id,
  created_at,
  shipment_number,
  current_load_value,
  max_load_value,
  transport,
  shipment_status,
  from_city,
  to_city,
  transport_info,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className="p-2 flex flex-col gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md cursor-pointer xs:p-4 sm:gap-6 lg:gap-4"
    >
      <div className="pb-2 flex items-center gap-2 text-sm border-b-2 border-gray-400/20 xs:pb-4 lg:text-base">
        <div className="flex items-center gap-1 text-sm flex-wrap xl:gap-2">
          <div className="font-semibold leading-4 lg:text-base xl:text-lg">
            <span>{from_city} - </span>
            <span>{to_city}</span>
          </div>
          <div className="text-primary xl:text-base">{created_at}</div>
        </div>
        <span
          className={`ml-auto text-2xl lg:text-3xl ${calcTransportLoadProgressColor(
            current_load_value,
            max_load_value
          )}`}
        >
          {Math.floor((current_load_value / max_load_value) * 100)}%
        </span>
      </div>

      <div className="flex gap-2 justify-between text-sm xl:text-base">
        <ul className="flex flex-col gap-2">
          <li className="flex flex-col gap-1">
            <span className="text-primary">Доступно, кг</span>
            <span className="xl:text-lg">
              <span>{current_load_value}</span> /{' '}
              <span className="text-primary">{max_load_value}</span>
            </span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-primary">№ отгрузки</span>
            <span className="xl:text-lg">{shipment_number}</span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-primary">Машина</span>
            <span className="leading-4 xl:text-lg">{transport}</span>
          </li>
        </ul>

        <div className="relative h-37 flex items-center justify-center">
          <progress
            className={`absolute w-17 h-12 top-9.5 left-0 border-2 border-gray-400/70 transport_load ${calcTransportLoad(
              current_load_value,
              max_load_value
            )} md:w-22 md:h-15 md:top-7.5 xl:h-15`}
            value={current_load_value}
            max={max_load_value}
          ></progress>

          <BsTruckFlatbed className="text-8xl text-gray-500/40 md:text-9xl" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ActiveRequestCard;
