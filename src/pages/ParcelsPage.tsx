// Ui:
import BreadCrumbs from '../shared/ui/BreadCrumbs';
import AddParcelTip from '../app/entites/parcels/AddParcelTip';
import AddParcelForm from '../app/features/parcels/addNewParcel/AddParcelForm';
import ParcelsInfoTable from '../app/widgets/parcels/ParcelsInfoTable';

const ParcelsPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4 lg:h-screen">
      <BreadCrumbs
        backTopath="/"
        backToPageTitle="Главная"
        currentPath="/parcels"
        currentPageTitle="Посылки"
      />

      <div className="w-full h-full flex flex-col gap-4 sm:flex-row lg:h-full">
        <div className="w-full flex flex-col gap-4">
          <AddParcelTip />

          <AddParcelForm />
        </div>

        <ParcelsInfoTable />
      </div>
    </main>
  );
};

export default ParcelsPage;
