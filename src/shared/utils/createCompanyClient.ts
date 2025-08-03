import { v4 as uuidv4 } from 'uuid';

// Types:
import { ClientFormFields } from '../../pages/clients/AddClientForm';
import { Client } from '../../app/redux/slices/clientsSlice';

const createCompanyClient = (clientFormData: ClientFormFields) => {
  const companyClientData: Client = {
    id: uuidv4(),
    ...clientFormData,
  };

  return companyClientData;
};

export default createCompanyClient;
