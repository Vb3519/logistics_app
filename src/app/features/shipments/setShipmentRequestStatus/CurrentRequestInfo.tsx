import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// State:
import {
  setShipmentStatus,
  setShipmentStatusErrorMsg,
  selectShipmentStatusError,
} from '../../../redux/slices/shipmentStatusSlice';

// Types:
import { AppDispatch } from '../../../redux/store';
import { ShipmentStatus } from '../../../../types/shipments.interface';

interface CurrentRequestInfoInfo_Props {
  shipment_number: string;
  transport: string;
}

const CurrentRequestInfo: React.FC<CurrentRequestInfoInfo_Props> = memo(
  ({ shipment_number, transport }) => {
    const dispatch: AppDispatch = useDispatch();

    const shipmentStatusError: string = useSelector(selectShipmentStatusError);

    // Установка статуса для заявки на отгрузку:
    const handleSetShipmentStatus = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (shipmentStatusError) {
        dispatch(setShipmentStatusErrorMsg(''));
      }

      const statusVal = event.target.value;

      if (
        statusVal === 'В пути' ||
        statusVal === 'Завершена' ||
        statusVal === 'Опаздывает'
      ) {
        dispatch(setShipmentStatus(statusVal));
      }
    };

    return (
      <>
        <div className="h-full flex flex-col gap-4 text-sm xl:text-base">
          <div className="h-full flex flex-col gap-1">
            <span className="text-secondary">Заявка </span>
            <div className="h-full p-4 flex items-center border-b-2 border-b-[#cbcbcb] bg-element_primary text-primary rounded-md">
              {shipment_number}
            </div>
          </div>

          <div className="h-full flex flex-col gap-1">
            <span className="text-secondary">Автомобиль </span>
            <div className="h-full p-4 flex items-center border-b-2 border-b-[#cbcbcb] bg-element_primary text-primary rounded-md">
              {transport}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm xl:text-base">
          <span className="text-[#7B57DF]">Статус отгрузки</span>

          <fieldset className="p-4 flex flex-col gap-1 border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md lg:gap-2">
            <CurrentRequestStatusElem
              shipmentStatusId="shipment_in_proccess"
              shipmentStatusValue="В пути"
              shipmentStatusLabel="В пути"
              changeShipmentStatus={handleSetShipmentStatus}
            />

            <CurrentRequestStatusElem
              shipmentStatusId="shipment_completed"
              shipmentStatusValue="Завершена"
              shipmentStatusLabel="Завершена"
              changeShipmentStatus={handleSetShipmentStatus}
            />

            <CurrentRequestStatusElem
              shipmentStatusId="shipment_is_delayed"
              shipmentStatusValue="Опаздывает"
              shipmentStatusLabel="Опаздывает"
              changeShipmentStatus={handleSetShipmentStatus}
            />

            <span className="text-amber-500 text-sm leading-4">
              {shipmentStatusError && 'Укажите статус отгрузки'}
            </span>
          </fieldset>
        </div>
      </>
    );
  }
);

export default CurrentRequestInfo;

// Инпут для выбора статуса отгрузки:
// -----------------------------------------
interface CurrentRequestStatusElem_Props {
  shipmentStatusId: ShipmentStatusIdType;
  shipmentStatusValue: ShipmentStatus;
  shipmentStatusLabel: ShipmentStatus;
  changeShipmentStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShipmentStatusId = {
  inProcess: 'shipment_in_proccess',
  completed: 'shipment_completed',
  delayed: 'shipment_is_delayed',
} as const;

type ShipmentStatusIdType =
  (typeof ShipmentStatusId)[keyof typeof ShipmentStatusId];

const CurrentRequestStatusElem: React.FC<CurrentRequestStatusElem_Props> = ({
  shipmentStatusId,
  shipmentStatusValue,
  shipmentStatusLabel,
  changeShipmentStatus,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        name="shipment_status"
        id={shipmentStatusId}
        value={shipmentStatusValue}
        onChange={changeShipmentStatus}
        type="radio"
      ></input>
      <label htmlFor={shipmentStatusId} className="cursor-pointer">
        {shipmentStatusLabel}
      </label>
    </div>
  );
};
