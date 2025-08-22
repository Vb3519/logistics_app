// Utils:
import {
  calcTransportLoad,
  calcTransportLoadProgressColor,
} from '../../../../../../shared/utils/calcTransportLoad';

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

  return (
    <li
      className="h-full min-h-20 p-2 flex gap-2 border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md sm:p-4"
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
          <span
            className={`${calcTransportLoadProgressColor(
              current_load_value,
              max_load_value
            )}`}
          >
            {Math.floor((current_load_value / max_load_value) * 100)}
          </span>{' '}
          <span className="text-primary">/ 100%</span>
        </p>

        <progress
          className={`hidden h-2 w-full transport_load_mobile ${calcTransportLoad(
            current_load_value,
            max_load_value
          )} sm:block`}
          value={current_load_value}
          max={max_load_value}
        ></progress>
      </div>
    </li>
  );
};

export default ActiveRequestsListElem;
