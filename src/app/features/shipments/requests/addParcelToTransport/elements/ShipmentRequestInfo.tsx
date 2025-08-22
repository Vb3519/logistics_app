import { memo } from 'react';

interface ShipmentRequestInfo_Props {
  shipment_number: string;
  transport: string;
}

const ShipmentRequestInfo: React.FC<ShipmentRequestInfo_Props> = memo(
  ({ shipment_number, transport }) => {
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
            <div className="flex items-center gap-2">
              <input
                name="shipment_status"
                id="shipment_in_proccess"
                type="radio"
              ></input>
              <label htmlFor="shipment_in_proccess" className="cursor-pointer">
                В пути
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                name="shipment_status"
                id="shipment_completed"
                type="radio"
              ></input>
              <label htmlFor="shipment_completed" className="cursor-pointer">
                Завершен
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                name="shipment_status"
                id="shipment_is_delayed"
                type="radio"
              ></input>
              <label htmlFor="shipment_is_delayed" className="cursor-pointer">
                Опаздывает
              </label>
            </div>
          </fieldset>
        </div>
      </>
    );
  }
);

export default ShipmentRequestInfo;
