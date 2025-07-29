// Ui:
import CustomSection from '../../shared/ui/CustomSection';
import BreadCrumbs from '../../shared/ui/BreadCrumbs';

const AvailableShipmentsPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/shipments"
        backToPageTitle="Все отгрузки"
        currentPath="/shipments/available"
        currentPageTitle="Текущие заявки"
      />

      <CustomSection className="min-h-screen w-full p-2 flex flex-col justify-between bg-white container-shadow xs:rounded-md lg:min-h-0 lg:h-full">
        <h1 className="m-auto">
          Страница с неотправленным транспортом (текущие заявки)
        </h1>
      </CustomSection>
    </main>
  );
};

export default AvailableShipmentsPage;
