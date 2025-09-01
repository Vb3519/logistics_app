import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Ui:
import CustomButton from '../../../../shared/ui/CustomButton';
import CustomSection from '../../../../shared/ui/CustomSection';

// State:
import {
  selectShipmentRequests,
  addParcelsToShipment,
} from '../../../redux/slices/shipmentsSlice';

import {
  selectParcelsToUploadData,
  selectParcelsWeightOverloadError,
  setParcelsWeightOverloadError,
  resetParcelsToUploadState,
} from '../../../redux/slices/parcelsToUploadSlice';

import { selectIsUploadingParcel } from '../../../redux/slices/parcelsSlice';

// Services:
import uploadParcelToShipmentRequest from '../../../services/parcels/uploadParcelToShipmentRequest';

// Types:
import { AppDispatch } from '../../../redux/store';
import { ShipmentRequest } from '../../../../types/shipments.interface';

// Api:
import { PARCELS_URL } from '../../../../shared/api/logistics_appApi';

const ParcelsToUpload = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  const parcelsWeightOverloadError: string = useSelector(
    selectParcelsWeightOverloadError
  );
  const isUploadingParcel: boolean = useSelector(selectIsUploadingParcel);

  // Текущие не проведенные заявки на отгрузку:
  // ---------------------------------------------
  const shipmentRequests = useSelector(selectShipmentRequests);
  const currentShipmentRequest: ShipmentRequest | undefined =
    shipmentRequests.find((shipmentRequest) => shipmentRequest.id === id);

  // Выбранные на отгрузку посылки:
  // ---------------------------------------------
  const parcelsToUploadData = useSelector(selectParcelsToUploadData);
  const parcelsTotalWeight = parcelsToUploadData.reduce(
    (totalWeight, parcel) => (totalWeight += Number(parcel.parcel_weight)),
    0
  );

  // "Привязать" выбранные посылки к непроведенной заявке на отгрузку:
  // -----------------------------------------------------------------------
  const handleAddParcelsToShipment = async () => {
    if (currentShipmentRequest) {
      // Расчет суммарного веса посылок:
      const totalMaxLoadVal: number = currentShipmentRequest.max_load_value;

      const remainingLoadVal: number =
        currentShipmentRequest.max_load_value -
        currentShipmentRequest.current_load_value;

      const isWeightOverload: boolean =
        totalMaxLoadVal < parcelsTotalWeight ||
        remainingLoadVal < parcelsTotalWeight;

      // Логика обработки веса выбранных посылок по сравнению с грузоподъемностью машины:
      if (isWeightOverload) {
        if (parcelsWeightOverloadError === '') {
          dispatch(setParcelsWeightOverloadError('Уменьшите вес посылок'));
        }
      } else {
        // Сервер: обход всех посылок и замена у нужных поля isUploaded на true
        const uploadAllParcels = parcelsToUploadData.map((parcelInfo) => {
          const parcelToUpload = {
            url: PARCELS_URL,
            parcelId: parcelInfo.id,
          };

          return dispatch(uploadParcelToShipmentRequest(parcelToUpload));
        });

        await Promise.all(uploadAllParcels);

        // Клиент: Добавление всех выбранных посылок в массив посылок активной заявки на отгрузку:
        const parcelsAndShipmentData = {
          currentShipmentId: currentShipmentRequest.id,
          parcelsToUploadData: parcelsToUploadData,
          parcelsTotalWeight: parcelsTotalWeight,
        };

        dispatch(addParcelsToShipment(parcelsAndShipmentData));

        // Клиент: ресет выбранных посылок в компоненте расчета их общего веса:
        dispatch(resetParcelsToUploadState());
      }
    }
  };

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
          disabled={
            parcelsToUploadData.length === 0 ||
            parcelsWeightOverloadError !== '' ||
            isUploadingParcel
          }
          className={`p-2 mx-auto w-1/2 min-w-45 max-w-60 text-[whitesmoke] ${
            parcelsToUploadData.length === 0 ||
            parcelsWeightOverloadError !== '' ||
            isUploadingParcel
              ? 'bg-gray-300'
              : 'bg-[#7B57DF]'
          }`}
          onClick={() => {
            handleAddParcelsToShipment();
          }}
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
