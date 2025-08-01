// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

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
      className="p-2 flex flex-col gap-2 bg-gray-200 rounded-sm xs:p-4"
    >
      <div className="flex items-center gap-2 text-sm lg:text-base">
        <div>{adress}</div>
        <div>{date}</div>
        <span>{progress}</span>
      </div>

      <div className="flex gap-2 justify-between text-sm lg:text-base">
        <ul className="flex flex-col gap-2">
          <li className="flex flex-col gap-1">
            <span className="text-gray-500">Доступно, кг</span>
            <span>
              <span>{current_weight}</span> / {max_weight}
            </span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-gray-500">Номер отгрузки</span>
            <span>{shipment_number}</span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-gray-500">Машина</span>
            <span>{truck_number}</span>
          </li>
        </ul>
        <div className="relative max-h-37 flex items-center justify-center">
          <div className="absolute w-22 h-15 top-7.5 left-0 bg-amber-300"></div>
          <BsTruckFlatbed className="text-9xl text-gray-300" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CurrentShipmentsCard;
