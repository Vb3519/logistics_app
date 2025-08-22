import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// Ui:
import CustomButton from '../../../../../../shared/ui/CustomButton';

// State:
import { selectIsUnloadingParcel } from '../../../../../redux/slices/parcelsSlice';
import { toggleShipmentParcelsList } from '../../../../../redux/slices/shipmentParcelsListSlice';
import { removeParcelsFromShipment } from '../../../../../redux/slices/shipmentsSlice';

// Services:
import unloadParcelFromShipmentRequest from '../../../../parcels/services/unloadParcelFromShipmentRequest';

// Types:
import { Parcel } from '../../../../../../types/parcels.interface';
import { AppDispatch } from '../../../../../redux/store';

// Api:
import { PARCELS_URL } from '../../../../../../shared/api/logistics_appApi';

// Кнопки действий для работы с заявкой на отгрузку:
// ---------------------------------------------------------------------------
interface CurrentRequestActions_Props {
  uploadedParcels: Parcel[] | undefined;
}
const CurrentRequestActions: React.FC<CurrentRequestActions_Props> = memo(
  ({ uploadedParcels }) => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();

    const isUnloadingParcel = useSelector(selectIsUnloadingParcel);

    // Отображение списка посылок, добавленных к непроведенной заявке на отгрузку:
    // ----------------------------------------------------------
    const handleToggleShipmentParcelsList = () => {
      dispatch(toggleShipmentParcelsList());
    };

    // Убрать посылки из непроведенной заявки на отгрузку:
    // ----------------------------------------------------------
    const handleRemoveParcelsFromShipment = async (
      url: string,
      uploadedParcelsData: Parcel[] | undefined
    ) => {
      if (uploadedParcelsData) {
        const parcelsToUnload = uploadedParcelsData?.map((parcelInfo) => {
          const parcelToUnloadData = {
            url: url,
            parcelId: parcelInfo.id,
          };

          return dispatch(unloadParcelFromShipmentRequest(parcelToUnloadData));
        });

        await Promise.all(parcelsToUnload);

        dispatch(removeParcelsFromShipment(id));
      }
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-center text-sm flex-wrap xl:text-base">
          <CustomButton
            className="p-2 w-40 flex gap-2 items-center justify-center text-[#7B57DF] bg-element_primary xl:w-45"
            onClick={() => {
              handleToggleShipmentParcelsList();
            }}
          >
            <BsBoxSeamFill />
            <span className="text-nowrap">Список посылок</span>
          </CustomButton>

          <CustomButton className="p-2 w-40 text-[#7B57DF] bg-element_primary xl:w-45">
            <span className="text-nowrap">Завершить загрузку</span>
          </CustomButton>
        </div>

        <CustomButton
          disabled={isUnloadingParcel}
          className={`p-2 mx-auto w-1/2 min-w-50 border-2 border-[#e3d9ff] text-sm text-secondary transition duration-200 ease-in-out ${
            isUnloadingParcel && 'animate-pulse'
          } xl:text-base hover:text-primary hover:border-[#cbb9fd]`}
          onClick={() => {
            handleRemoveParcelsFromShipment(PARCELS_URL, uploadedParcels);
          }}
        >
          {isUnloadingParcel ? 'Выгрузка посылок' : 'Отменить заявку'}
        </CustomButton>
      </div>
    );
  }
);

export default CurrentRequestActions;
