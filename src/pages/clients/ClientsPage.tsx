// Ui:
import BreadCrumbs from '../../shared/ui/BreadCrumbs';
import ClientsTable from './ClientsTable';
import AddClientForm from './AddClientForm';
import AddClientTip from './AddClientTip';

const ClientsPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/"
        backToPageTitle="Главная"
        currentPath="/clients"
        currentPageTitle="Клиенты"
      />

      <div className="w-full flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <AddClientTip />

          <AddClientForm />
        </div>

        <ClientsTable />
      </div>
    </main>
  );
};

export default ClientsPage;
