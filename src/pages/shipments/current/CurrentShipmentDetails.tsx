import { useParams } from 'react-router-dom';

// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import CustomButton from '../../../shared/ui/CustomButton';
import BreadCrumbs from '../../../shared/ui/BreadCrumbs';
import ParcelsTable from '../../parcels/ParcelsTable';

// Data:
import { currentShipmentsData } from '../../../shared/data/shipmentsData';

const CurrentShipmentDetails = () => {
  const params = useParams();
  const { id } = params;

  const currentShipmentData = currentShipmentsData.find((el) => el.id === id);

  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/shipments"
        backToPageTitle="Текущие отгрузки"
        currentPath=""
        currentPageTitle={`${id}`}
      />

      <div className="w-full flex flex-col gap-4 md:flex-row">
        <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full lg:flex-row lg:gap-8 lg:basis-2/5">
          {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
          {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
          {/* ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ВЫБРАННОЙ ЗАЯВКЕ: */}
          <div className="w-full flex flex-col gap-2 lg:gap-4">
            <div className="flex items-center gap-2 text-sm lg:text-base">
              <div className="font-bold lg:text-lg">
                {currentShipmentData?.adress}
              </div>
              <div className="mt-0.5 text-secondary">
                {currentShipmentData?.date}
              </div>
            </div>

            <div className="p-4 flex items-center gap-2 text-sm bg-element_primary rounded-md lg:text-base">
              <p>Загруженность машины</p>
              <span className="ml-auto text-lg text-amber-400 lg:text-4xl">
                {currentShipmentData?.progress}
              </span>
            </div>

            <div className="flex flex-col gap-4 text-sm lg:text-base">
              <div className="flex flex-col gap-1">
                <span className="text-secondary">Заявка </span>
                <span className="p-4 bg-element_primary text-primary rounded-md">
                  {id}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-secondary">Автомобиль </span>
                <span className="p-4 bg-element_primary text-primary rounded-md">
                  {currentShipmentData?.truck_number}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm lg:text-base">
              <span className="text-secondary">Статус отгрузки</span>

              <fieldset className="p-4 bg-element_primary rounded-md">
                <div className="flex items-center gap-2">
                  <input
                    name="shipment_status"
                    id="shipment_in_proccess"
                    type="radio"
                  ></input>
                  <label
                    htmlFor="shipment_in_proccess"
                    className="cursor-pointer"
                  >
                    В пути
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    name="shipment_status"
                    id="shipment_completed"
                    type="radio"
                  ></input>
                  <label
                    htmlFor="shipment_completed"
                    className="cursor-pointer"
                  >
                    Завершен
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    name="shipment_status"
                    id="shipment_is_delayed"
                    type="radio"
                  ></input>
                  <label
                    htmlFor="shipment_is_delayed"
                    className="cursor-pointer"
                  >
                    Опаздывает
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="p-4 flex items-center justify-between gap-2 text-sm lg:text-base">
              <div className="flex flex-col gap-2">
                <span className="text-secondary">Доступно, кг</span>
                <div>
                  <span className="lg:text-4xl">
                    {currentShipmentData?.current_weight}
                  </span>
                  <span className="text-secondary lg:text-4xl">
                    /{currentShipmentData?.max_weight}
                  </span>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute w-22 h-15 top-5 left-0 border-2 border-gray-400/70 bg-amber-300 lg:w-43 lg:h-30 lg:top-10"></div>
                <BsTruckFlatbed className="text-9xl text-gray-500/40 lg:text-[250px]" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <CustomButton className="p-2 text-[#7B57DF] bg-element_primary">
                Завершить загрузку
              </CustomButton>

              <CustomButton className="p-2 text-[#7B57DF] bg-element_primary">
                Отменить заявку
              </CustomButton>
            </div>
          </div>
        </CustomSection>

        {/* ПЕРЕЧЕНЬ ДОСТУПНЫХ ПОСЫЛОК: */}
        {/* ПЕРЕЧЕНЬ ДОСТУПНЫХ ПОСЫЛОК: */}
        {/* ПЕРЕЧЕНЬ ДОСТУПНЫХ ПОСЫЛОК: */}
        <ParcelsTable isCheckBoxNeeded={true} />
      </div>
    </main>
  );
};

export default CurrentShipmentDetails;
