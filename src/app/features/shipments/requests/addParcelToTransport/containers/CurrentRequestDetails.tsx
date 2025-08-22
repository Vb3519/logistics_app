import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMemo, memo } from 'react';

// Ui:
import CustomSection from '../../../../../../shared/ui/CustomSection';
import CurrentRequestInfo from './CurrentRequestInfo';
import CurrentRequestSkeleton from '../../loadRequestsData/skeletons/CurrentRequestSkeleton';
import CurrentRequestParcelsAndActions from '../elements/CurrentRequestParcelsAndActions';

// State:
import { selectShipmentRequests } from '../../../../../redux/slices/shipmentsSlice';

// Types:
import { ShipmentRequest } from '../../../../../../types/shipments.interface';
import { Parcel } from '../../../../../../types/parcels.interface';

// Utils:
import { calcTransportLoadProgressColor } from '../../../../../../shared/utils/calcTransportLoad';

const CurrentRequestDetails = () => {
  const { id } = useParams();

  const shipmentRequests = useSelector(selectShipmentRequests);

  const currentShipmentRequestData: ShipmentRequest | undefined =
    useMemo(() => {
      return shipmentRequests.find(
        (shipmentRequest) => shipmentRequest.id === id
      );
    }, [shipmentRequests, id]);

  const uploadedParcels: Parcel[] | undefined =
    currentShipmentRequestData?.shipment_parcels;

  return currentShipmentRequestData ? (
    <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full lg:gap-8 lg:basis-2/5">
      {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
      <div className="w-full h-full flex flex-col gap-2 lg:gap-4">
        <div className="flex items-center gap-1 text-sm flex-wrap xl:gap-2">
          <div className="font-semibold leading-4 lg:text-base xl:text-lg">
            <span>{currentShipmentRequestData.from_city} - </span>
            <span>{currentShipmentRequestData.to_city}</span>
          </div>
          <div className="text-primary xl:text-base">
            {currentShipmentRequestData.created_at}
          </div>
        </div>

        {/* Заполненность транспорта в %: */}
        <PercentageOfCarLoad
          current_load_value={currentShipmentRequestData.current_load_value}
          max_load_value={currentShipmentRequestData.max_load_value}
        />

        {/* Информация об отгрузке (номер, транспорт): */}
        <CurrentRequestInfo
          shipment_number={currentShipmentRequestData.shipment_number}
          transport={currentShipmentRequestData.transport}
        />

        {/* Добавленные посылки и действия с ними: */}
        <CurrentRequestParcelsAndActions
          uploadedParcels={uploadedParcels}
          currentVal={currentShipmentRequestData.current_load_value}
          maxVal={currentShipmentRequestData.max_load_value}
        />
      </div>
    </CustomSection>
  ) : (
    <CurrentRequestSkeleton />
  );
};

export default CurrentRequestDetails;

// Процент загруженности машины:
// -----------------------------------------------------
interface PercentageOfCarLoad_Props {
  current_load_value: number;
  max_load_value: number;
}

const PercentageOfCarLoad: React.FC<PercentageOfCarLoad_Props> = memo(
  ({ current_load_value, max_load_value }) => {
    return (
      <div className="p-4 h-full flex-1 flex items-center gap-2 text-sm border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md xl:text-base">
        <p>Загруженность машины</p>

        <span
          className={`ml-auto text-2xl ${calcTransportLoadProgressColor(
            current_load_value,
            max_load_value
          )} lg:text-3xl`}
        >
          {Math.floor((current_load_value / max_load_value) * 100)}%
        </span>
      </div>
    );
  }
);
