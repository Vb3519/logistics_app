// Form:
// ------------------------------------------------------------------
export interface ClientFormFields {
  company_title: string;
  employee_name: string;
  employee_sern: string;
  company_phone: string;
  company_email: string;
}

// Data:
// ------------------------------------------------------------------
export interface Client {
  id: string;
  company_title: string;
  employee_name: string;
  employee_sern: string;
  company_phone: string;
  company_email: string;
}

// State:
// ------------------------------------------------------------------
export interface ClientsState {
  clientsData: Client[];
  clientsDataError: string;
  clientsFormError: string;
  isClientsDataLoading: boolean;
  isClientsFormDataSending: boolean;
}

export interface ClientsStateSlice {
  clients: ClientsState;
}

// Table:
// ------------------------------------------------------------------
export interface ClientsTableRow_Props {
  companyClientData: Client;
}

// Components:
// ------------------------------------------------------------------
