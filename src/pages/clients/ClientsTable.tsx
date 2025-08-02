import { useState } from 'react';

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

const ClientsTable = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <CustomSection className="w-full flex flex-col gap-2 justify-between overflow-x-auto bg-section_primary">
      <TableContainer sx={{ maxHeight: '90vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {clientsTableHeaderTitles.map((title, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#6B7280',
                      fontFamily: 'inter',
                    }}
                  >
                    {title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {clientsData
              .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
              .map((clientInfo) => {
                return (
                  <TableRow
                    key={clientInfo.id}
                    sx={{ cursor: 'pointer' }}
                    className="transition delay-50 ease-in hover:bg-gray-200"
                  >
                    <TableCell sx={{ textAlign: 'center' }}>
                      {clientInfo.company}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {clientInfo.contact}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', textWrap: 'nowrap' }}>
                      {clientInfo.phone}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {clientInfo.email}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={clientsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </CustomSection>
  );
};

export default ClientsTable;
