import { memo } from 'react';

// Types:
import { CurrentRequestInfo_Props } from './types';
import { CurrentRequestStatusInput_Props } from './types';

// Model:
import useSetShipmentStatus from '../model/useSetShipmentStatus';

const CurrentRequestInfo: React.FC<CurrentRequestInfo_Props> = memo(
  ({ shipment_number, transport }) => {
    const { setShipmentStatusWrapper, shipmentStatusError } =
      useSetShipmentStatus();

    // Установка статуса для заявки на отгрузку:
    const handleSetShipmentStatus = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const statusVal: string = event.target.value;

      setShipmentStatusWrapper(shipmentStatusError, statusVal);
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
            <CurrentRequestStatusInput
              shipmentStatusId="shipment_in_proccess"
              shipmentStatusValue="В пути"
              shipmentStatusLabel="В пути"
              changeShipmentStatus={handleSetShipmentStatus}
            />

            <CurrentRequestStatusInput
              shipmentStatusId="shipment_completed"
              shipmentStatusValue="Завершена"
              shipmentStatusLabel="Завершена"
              changeShipmentStatus={handleSetShipmentStatus}
            />

            <CurrentRequestStatusInput
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
const CurrentRequestStatusInput: React.FC<CurrentRequestStatusInput_Props> = ({
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
