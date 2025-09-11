// React-icons:
import { ImFilesEmpty } from 'react-icons/im';

// Ui:
import BreadCrumbs from '../../../shared/ui/BreadCrumbs';
import CustomSection from '../../../shared/ui/CustomSection';

const ShipmentNotFoundPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-2 xs:mx-4 lg:mx-0 xs:gap-4 lg:px-4">
      <BreadCrumbs
        backTopath="/shipments"
        backToPageTitle="Текущие отгрузки"
        currentPath="not-found"
        currentPageTitle="Ошибка"
      />

      <CustomSection className="min-h-screen w-full p-2 flex flex-col gap-2 bg-section_primary container-shadow xs:rounded-md xs:gap-4 lg:min-h-0 lg:h-full">
        <h3 className="font-semibold text-[#7B57DF] title-shadow text-sm xl:text-base">
          Отгрузка не найдена
        </h3>

        <div className="flex flex-col items-center justify-center gap-2 flex-1 text-sm xl:text-base">
          <ImFilesEmpty className="text-6xl text-secondary xl:text-8xl" />
          <p className="text-center">
            Проверьте правильность введенного номера отгрузки.
          </p>
        </div>
      </CustomSection>
    </main>
  );
};

export default ShipmentNotFoundPage;
