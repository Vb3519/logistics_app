import { useSelector } from 'react-redux';

// State:
import { selectIsShipmentParselsListOpened } from '../../../../../redux/slices/shipmentParcelsListSlice';

// Types:
import { Parcel } from '../../../../../../types/parcels.interface';

// Ui:
import CurrentRequestActions from '../containers/CurrentRequestActions';
import CurrentTransportLoad from './CurrentTransportLoad';
import UploadedToTransportParcels from './UploadedToTransportParcels';

interface CurrentRequestParcelsAndActions_Props {
  uploadedParcels: Parcel[] | undefined;
  currentVal: number;
  maxVal: number;
}
const CurrentRequestParcelsAndActions: React.FC<
  CurrentRequestParcelsAndActions_Props
> = ({ uploadedParcels, currentVal, maxVal }) => {
  const isShipmentParcelsListOpened: boolean = useSelector(
    selectIsShipmentParselsListOpened
  );

  return (
    <>
      {isShipmentParcelsListOpened && uploadedParcels ? (
        <UploadedToTransportParcels uploadedParcels={uploadedParcels} />
      ) : (
        <CurrentTransportLoad currentVal={currentVal} maxVal={maxVal} />
      )}

      <CurrentRequestActions uploadedParcels={uploadedParcels} />
    </>
  );
};

export default CurrentRequestParcelsAndActions;
