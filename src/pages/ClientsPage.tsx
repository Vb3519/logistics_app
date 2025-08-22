// Ui:
import BreadCrumbs from '../shared/ui/BreadCrumbs';
import AddClientTip from '../app/features/clients/addClient/elements/AddClientTip';
import AddClientForm from '../app/features/clients/addClient/containers/AddClientForm';
import ClientsTable from '../app/features/clients/loadClientsData/containers/ClientsTable';

const ClientsPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/"
        backToPageTitle="Главная"
        currentPath="/clients"
        currentPageTitle="Клиенты"
      />

      <div className="w-full flex flex-col gap-4 md:flex-row lg:flex-col xl:flex-row">
        <div className="flex flex-col gap-4 lg:flex-row xl:flex-col">
          <AddClientTip />

          <AddClientForm />
        </div>

        <ClientsTable />
      </div>
    </main>
  );
};

export default ClientsPage;
