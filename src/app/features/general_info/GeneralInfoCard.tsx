import { useSelector } from 'react-redux';

// State:
import { selectisShipmentRequestsDataLoading } from '../../redux/slices/shipmentsSlice';
import { selectIsParcelsDataLoading } from '../../redux/slices/parcelsSlice';
import { selectIsShipmentsLogDataLoading } from '../../redux/slices/shipmentsLogSlice';

interface GeneralInfoCard_Props extends React.LiHTMLAttributes<HTMLLIElement> {
  className?: string;
  card_title: string;
  value: number;
  icon: React.ReactNode;
}

const GeneralInfoCard: React.FC<GeneralInfoCard_Props> = ({
  className,
  ...props
}) => {
  const { card_title, value, icon } = props;

  const isShipmentRequestsDataLoading = useSelector(
    selectisShipmentRequestsDataLoading
  );

  const isParcelsDataLoading = useSelector(selectIsParcelsDataLoading);

  const isShipmentsLogDataLoading = useSelector(
    selectIsShipmentsLogDataLoading
  );

  const isDataLoading =
    isShipmentRequestsDataLoading ||
    isParcelsDataLoading ||
    isShipmentsLogDataLoading;

  return (
    <li
      className={`${className} min-w-40 p-4 flex gap-2 items-center justify-between border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md md:min-w-60 md:min-h-30 xl:px-12 2xl:min-w-78`}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <p className="text-primary">{card_title}</p>
        {isDataLoading ? (
          <div className="h-7 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
        ) : (
          <p className="text-xl font-semibold">{value}</p>
        )}
      </div>
      {icon}
    </li>
  );
};

export default GeneralInfoCard;
