import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Ui:
import CustomButton from '../../../../../shared/ui/CustomButton';
import CustomSection from '../../../../../shared/ui/CustomSection';

// State:
import { selectShipmentRequests } from '../../../../redux/slices/shipmentsSlice';

import {
  selectParcelsToUploadData,
  selectParcelsWeightOverloadError,
} from '../../../../redux/slices/parcelsToUploadSlice';

import { selectIsUploadingParcel } from '../../../../redux/slices/parcelsSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';

// Model:
import uploadParcelsToShipment from '../model/uploadParcelsToShipment';

const ParcelsToUpload = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  // Перегруз по весу:
  const parcelsWeightOverloadError: string = useSelector(
    selectParcelsWeightOverloadError
  );

  // Текущие не проведенные заявки на отгрузку:
  const shipmentRequests = useSelector(selectShipmentRequests);

  // Выбранные на погрузку посылки:
  const isUploadingParcel: boolean = useSelector(selectIsUploadingParcel);

  const parcelsToUploadData = useSelector(selectParcelsToUploadData);
  const parcelsTotalWeight = parcelsToUploadData.reduce(
    (totalWeight, parcel) => (totalWeight += Number(parcel.parcel_weight)),
    0
  );

  // Погрузить выбранные посылки в непроведенную заявку на отгрузку:
  const handleUploadParcelsToShipment = async () => {
    await uploadParcelsToShipment({
      id: id,
      parcelsWeightOverloadError: parcelsWeightOverloadError,
      shipmentRequests: shipmentRequests,
      parcelsToUploadData: parcelsToUploadData,
      dispatch: dispatch,
    });
  };

  const isUploadBtnDisabled: boolean =
    parcelsToUploadData.length === 0 ||
    parcelsWeightOverloadError !== '' ||
    isUploadingParcel;

  return (
    <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow text-sm xs:rounded-md xl:text-base">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-[#7B57DF] title-shadow">
          Доступные посылки
        </h2>

        <div className="p-2 flex flex-col gap-1 bg-element_primary border-b-2 border-b-[#cbcbcb] rounded-md xs:p-4 xs:flex-row xs:gap-6">
          <div>
            <span className="text-primary">Выбрано, шт: </span>
            <span>{parcelsToUploadData.length}</span>
          </div>
          <div>
            <span className="text-primary">Вес, кг: </span>
            <span>{parcelsTotalWeight}</span>
          </div>
        </div>

        <CustomButton
          disabled={isUploadBtnDisabled}
          className={`p-2 mx-auto w-1/2 min-w-45 max-w-60 text-[whitesmoke] ${
            isUploadBtnDisabled ? 'bg-gray-300' : 'bg-[#7B57DF]'
          }`}
          onClick={handleUploadParcelsToShipment}
        >
          {isUploadingParcel ? 'Погрузка посылок' : 'Загрузить в машину'}
        </CustomButton>

        <span className="text-amber-500 text-sm text-center leading-4">
          {parcelsWeightOverloadError !== '' && parcelsWeightOverloadError}
        </span>
      </div>
    </CustomSection>
  );
};

export default ParcelsToUpload;
