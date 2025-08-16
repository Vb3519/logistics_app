import { v4 as uuidv4 } from 'uuid';

// Types:
import { ClientFormFields, Client } from '../../types/clients.interface';

const createCompanyClient = (clientFormData: ClientFormFields) => {
  const companyClientData: Client = {
    id: uuidv4(),
    ...clientFormData,
  };

  return companyClientData;
};

export default createCompanyClient;
