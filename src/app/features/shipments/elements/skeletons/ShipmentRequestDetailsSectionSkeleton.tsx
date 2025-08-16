// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../../../shared/ui/CustomSection';

const ShipmentRequestDetailsSectionSkeleton = () => {
  return (
    <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full lg:flex-row lg:gap-8 lg:basis-2/5">
      <div className="w-full flex flex-col gap-2 lg:gap-4">
        {/* Адрес и дата: */}
        <div className="h-6 text-sm bg-element_primary rounded-md animate-pulse lg:text-base"></div>

        {/* Загруженность машины: */}
        <div className="h-16 text-sm bg-element_primary rounded-md animate-pulse lg:text-base"></div>

        {/* Номер заявки и автомобиль: */}
        <div className="flex flex-col gap-4 text-sm lg:text-base">
          <div className="flex flex-col gap-1">
            <span className="text-secondary">Заявка </span>
            <div className="h-14 bg-element_primary text-primary rounded-md animate-pulse"></div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-secondary">Автомобиль </span>
            <div className="h-14 bg-element_primary text-primary rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Статус отгрузки: */}
        <div className="flex flex-col gap-1 text-sm lg:text-base">
          <span className="text-secondary">Статус отгрузки</span>
          <div className="h-24 bg-element_primary rounded-md animate-pulse"></div>
        </div>

        {/* Процент загруженности машины: */}
        <div className="p-4 flex items-center justify-between gap-2 text-sm lg:text-base">
          <div className="flex flex-col gap-2">
            <span className="text-secondary">Доступно, кг</span>
            <div className="h-4 w-1/3 bg-element_primary rounded-md animate-pulse"></div>
          </div>

          <div className="relative flex items-center justify-center animate-pulse">
            <div
              className={`absolute w-22 h-15 top-5 left-0 border-2 border-gray-400/70 bg-[#e5e7eb] xl:w-43 xl:h-30 xl:top-10`}
            ></div>
            <BsTruckFlatbed className="text-9xl text-gray-500/40 xl:text-[250px]" />
          </div>
        </div>

        {/* Кнопки действий": */}
        <div className="h-38 bg-element_primary rounded-md animate-pulse"></div>
      </div>
    </CustomSection>
  );
};

export default ShipmentRequestDetailsSectionSkeleton;
