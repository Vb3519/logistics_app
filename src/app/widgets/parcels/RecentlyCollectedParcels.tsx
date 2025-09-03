import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaAngleRight } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';

// State:
import {
  selectParcelsData,
  selectIsParcelsDataLoading,
} from '../../redux/slices/parcelsSlice';

// Services:
import loadParcelsData from '../../services/parcels/loadParcelsData';

// Types:
import { AppDispatch } from '../../redux/store';

// Api:
import {
  PARCELS_URL,
  ACTIVE_PARCELS_URL,
} from '../../../shared/api/logistics_appApi';

// Contants:
import { MIN_PARCELS_TO_RENDER } from '../../../shared/constants/logisticAppContants';

const RecentlyCollectedParcels = () => {
  const dispatch: AppDispatch = useDispatch();

  const parcelsData = useSelector(selectParcelsData);
  const recentlyCollectedParcels = parcelsData.slice(-MIN_PARCELS_TO_RENDER);
  const isParcelsDataLoading: boolean = useSelector(selectIsParcelsDataLoading);

  useEffect(() => {
    if (parcelsData.length === 0 && !isParcelsDataLoading) {
      dispatch(loadParcelsData(ACTIVE_PARCELS_URL));
    }
  }, []);

  const parcelsListPlaceholdersCounter: number =
    MIN_PARCELS_TO_RENDER - parcelsData.length;

  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="text-sm flex justify-between gap-2 xl:text-base">
        <h3 className="font-semibold text-[#7B57DF] title-shadow">
          Собранные посылки
        </h3>

        <NavLink
          to="parcels"
          className="flex items-center gap-1 text-[#7B57DF]"
        >
          Весь список
          <FaAngleRight className="mt-0.5" />
        </NavLink>
      </div>

      <ul className="h-full flex flex-col gap-2 text-sm xl:text-base">
        {recentlyCollectedParcels.map((parcelInfo) => {
          return (
            <CollectedParcelsElem
              key={parcelInfo.id}
              number={parcelInfo.parcel_number}
              status={parcelInfo.parcel_status}
            />
          );
        })}

        <CollectedParcelsPlaceholder
          counter={parcelsListPlaceholdersCounter}
          isDataLoading={isParcelsDataLoading}
        />
      </ul>
    </CustomSection>
  );
};

export default RecentlyCollectedParcels;

// Элемент списка недавно собранных посылок:
// ----------------------------------------------
interface CollectedParcelsElem_Props {
  number: string;
  status: string;
}

const CollectedParcelsElem: React.FC<CollectedParcelsElem_Props> = ({
  number,
  status,
}) => {
  return (
    <li className="h-full p-2 flex items-center gap-2 border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md text-sm sm:p-4 xl:text-base xl:gap-4">
      <BsBoxSeamFill className="text-2xl text-secondary/60 flex-shrink-0 xl:text-3xl" />

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{number}</h3>
        <p className="text-primary">
          <span className="">{status}</span>
        </p>
      </div>
    </li>
  );
};

// Лоадеры:
// ----------------------------------------------

// Контейнер для плейсхолдеров:
interface CollectedParcelsPlaceholder_Props {
  counter: number;
  isDataLoading: boolean;
}
const CollectedParcelsPlaceholder: React.FC<
  CollectedParcelsPlaceholder_Props
> = ({ counter, isDataLoading }) => {
  return (
    <>
      {Array.from({
        length: counter,
      }).map((_, index) => {
        return (
          <li
            key={index}
            className={`p-2 h-full min-h-15 flex gap-2 border-b-2 border-b-gray-200 bg-gray-100 rounded-md ${
              isDataLoading && 'animate-pulse'
            } sm:p-4 sm:min-h-16`}
          >
            <div className="flex items-center gap-3 text-secondary">
              <BsClockHistory className="text-2xl text-secondary/30" />
              <p className="text-secondary/60">Ожидается посылка</p>
            </div>
          </li>
        );
      })}
    </>
  );
};
