import { memo } from 'react';

// MUI:
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// Types:
import { ClientsTableRow_Props } from '../../../types/clients.interface';

const ClientsTableRow: React.FC<ClientsTableRow_Props> = memo(
  ({ companyClientData }) => {
    return (
      <TableRow>
        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            padding: '14px',
          }}
        >
          {companyClientData.company_title}
        </TableCell>

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            padding: '14px',
          }}
        >
          {companyClientData.employee_name} {companyClientData.employee_sern}
        </TableCell>

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            padding: '14px',
          }}
        >
          {companyClientData.company_phone}
        </TableCell>

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            padding: '14px',
          }}
        >
          {companyClientData.company_email}
        </TableCell>
      </TableRow>
    );
  }
);

export default ClientsTableRow;
