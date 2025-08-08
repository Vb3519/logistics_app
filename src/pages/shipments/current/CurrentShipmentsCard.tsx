// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Types:
interface CurrentShipmentsCard_Props
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  id?: string;
  adress: string;
  date: string;
  progress: string;
  current_weight: number;
  max_weight: number;
  shipment_number: string;
  truck_number: string;
  children?: React.ReactNode;
}

const CurrentShipmentsCard: React.FC<CurrentShipmentsCard_Props> = ({
  id,
  adress,
  date,
  progress,
  current_weight,
  max_weight,
  shipment_number,
  truck_number,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className="p-2 flex flex-col gap-2 bg-gradient-to-r bg-element_primary to-gray-300 rounded-md cursor-pointer xs:p-4"
    >
      <div className="pb-4 flex items-center gap-2 text-sm border-b-2 border-gray-400/20 lg:text-base">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-base lg:text-lg">{adress}</h3>
          <div className="text-primary">{date}</div>
        </div>
        <span className="ml-auto text-3xl text-amber-500/70">{progress}</span>
      </div>

      <div className="flex gap-2 justify-between text-sm lg:text-base">
        <ul className="flex flex-col gap-2">
          <li className="flex flex-col gap-1">
            <span className="text-primary">Доступно, кг</span>
            <span className="text-base lg:text-lg">
              <span>{current_weight}</span> /{' '}
              <span className="text-primary">{max_weight}</span>
            </span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-primary">№ отгрузки</span>
            <span className="text-base lg:text-lg">{shipment_number}</span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-primary">Машина</span>
            <span className="text-base lg:text-lg">{truck_number}</span>
          </li>
        </ul>
        <div className="relative max-h-37 flex items-center justify-center">
          <div className="absolute w-22 h-15 top-7.5 left-0 border-2 border-gray-400/70 bg-amber-300"></div>
          <BsTruckFlatbed className="text-9xl text-gray-500/40" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CurrentShipmentsCard;
