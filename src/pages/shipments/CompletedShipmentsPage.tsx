import { useState } from 'react';

// MUI (Tables):
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';
import BreadCrumbs from '../../shared/ui/BreadCrumbs';

// Data:
import {
  tableHeaderCols,
  shipmentsData,
} from '../../shared/data/shipmentsData';

const CompletedShipmentsPage = () => {
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

  const completedShipments = shipmentsData.filter(
    (el) => el.status === 'Завершен'
  );

  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/shipments"
        backToPageTitle="Текущие отгрузки"
        currentPath="/shipments/completed"
        currentPageTitle="Завершенные"
      />

      <CustomSection className="min-h-screen w-full p-2 flex flex-col justify-between bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full">
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {tableHeaderCols.map((el, index) => {
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#6B7280',
                      }}
                    >
                      {el}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {completedShipments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((el, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ cursor: 'pointer' }}
                      className="transition delay-50 ease-in hover:bg-gray-200"
                    >
                      <TableCell sx={{ textAlign: 'center' }}>
                        {el.adress}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {el.shipment_number}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {el.truck_number}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {el.total_weight}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {el.status}
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
          count={completedShipments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </CustomSection>
    </main>
  );
};

export default CompletedShipmentsPage;
