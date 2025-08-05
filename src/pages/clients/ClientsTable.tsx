import { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI:
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';

// Data:
import {
  clientsData,
  clientsTableHeaderTitles,
} from '../../shared/data/clientsData';

// State:
import {
  selectClients,
  loadClientsData,
} from '../../app/redux/slices/clientsSlice';

// Api:
import { CLIENTS_URL } from '../../shared/api/logistics_appApi';

// Types:
import { AppDispatch } from '../../app/redux/store';
import { Client } from '../../app/redux/slices/clientsSlice';

const ClientsTable = () => {
  console.log('ClientsTable Rendered');

  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Пагинация таблицы с клиентами компании:
  // -------------------------------------------
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Загрузка данных по клиентам компании:
  // -------------------------------------------
  const handleLoadClientsData = (url: string) => {
    dispatch(loadClientsData(url));
  };

  useEffect(() => {
    if (currentCompanyClients.length === 0) {
      handleLoadClientsData(CLIENTS_URL);
    }
  }, []);

  const currentCompanyClients = useSelector(selectClients);

  return (
    <CustomSection className="w-full min-h-[30vh] flex flex-col gap-2 justify-between overflow-x-auto bg-section_primary">
      <TableContainer sx={{ maxHeight: '90vh' }}>
        <Table stickyHeader>
          <TableHead className="container-shadow">
            <TableRow
              sx={{
                'th:first-of-type': {
                  borderTopLeftRadius: '4px',
                  borderBottomLeftRadius: '4px',
                },
                'th:last-of-type': {
                  borderTopRightRadius: '4px',
                  borderBottomRightRadius: '4px',
                },
              }}
            >
              {clientsTableHeaderTitles.map((title, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#6B7280',
                      fontFamily: 'inter',
                      padding: '14px',
                      backgroundColor: '#e5e7eb',
                    }}
                  >
                    {title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {currentCompanyClients
              .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
              .map((clientInfo) => {
                return (
                  <ClientsTableRow
                    key={clientInfo.id}
                    companyClientData={clientInfo}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={currentCompanyClients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </CustomSection>
  );
};

export default ClientsTable;

// Ряд с данными о клиенте из таблицы клиентов:
// -------------------------------------------------------
interface ClientsTableRow_Props {
  companyClientData: Client;
}

const ClientsTableRow: React.FC<ClientsTableRow_Props> = memo(
  ({ companyClientData }) => {
    console.log('ClientsTableRow Rendered');

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
