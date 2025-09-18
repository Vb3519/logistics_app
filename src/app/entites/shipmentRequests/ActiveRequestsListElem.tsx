// Utils:
import {
  calcTransportLoadCustom,
  calcTransportLoadProgressColor,
} from 'shared/utils/calcTransportLoad';

// Types:
export interface ActiveRequestsListElem_Props
  extends React.LiHTMLAttributes<HTMLLIElement> {
  id?: string;
  shipment_number: string;
  from_city: string;
  to_city: string;
  current_load_value: number;
  max_load_value: number;
}

const ActiveRequestsListElem: React.FC<ActiveRequestsListElem_Props> = (
  props
) => {
  const {
    shipment_number,
    from_city,
    to_city,
    current_load_value,
    max_load_value,
  } = props;

  const transportLoadPercentColor = calcTransportLoadProgressColor(
    current_load_value,
    max_load_value
  );

  const transportLoadPercent = Math.floor(
    (current_load_value / max_load_value) * 100
  );

  const transportLoadCustomColor = calcTransportLoadCustom(
    current_load_value,
    max_load_value
  );

  return (
    <li
      className="h-full p-2 flex gap-2 border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md xs:min-h-20 sm:p-4"
      {...props}
    >
      <div className="w-full flex flex-col gap-1">
        <p className="font-semibold">{shipment_number}</p>
        <p className="text-primary">
          <span>{from_city}</span> - <span>{to_city}</span>
        </p>
      </div>
      <div className="w-full flex flex-col justify-end gap-2">
        <p className="text-right text-base">
          <span className={`${transportLoadPercentColor}`}>
            {transportLoadPercent}
          </span>{' '}
          <span className="text-primary">/ 100%</span>
        </p>

        <div className="hidden w-full h-2 bg-gray-400/50 rounded-sm sm:block">
          <div
            style={{
              width: `${transportLoadPercent}%`,
            }}
            className={`h-2 ${transportLoadCustomColor} rounded-sm`}
          ></div>
        </div>
      </div>
    </li>
  );
};

export default ActiveRequestsListElem;
