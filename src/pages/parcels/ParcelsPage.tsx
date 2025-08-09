// Ui:
import BreadCrumbs from '../../shared/ui/BreadCrumbs';
import AddParcelTip from './AddParcelTip';
import AddParcelForm from './AddParcelForm';
import ParcelsTable from './ParcelsTable';

const ParcelsPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/"
        backToPageTitle="Главная"
        currentPath="/parcels"
        currentPageTitle="Посылки"
      />

      <div className="w-full h-full flex flex-col gap-4 sm:flex-row sm:h-[80vh] lg:h-full">
        <div className="w-full flex flex-col gap-4">
          <AddParcelTip />

          <AddParcelForm />
        </div>

        <ParcelsTable isCheckBoxNeeded={false} />
      </div>
    </main>
  );
};

export default ParcelsPage;
