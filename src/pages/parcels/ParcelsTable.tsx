import { useState } from 'react';

// MUI:
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';

// Data:
import { parcelsData } from '../../shared/data/parcelsData';

interface ParcelsTable_Props {
  isCheckBoxNeeded: boolean;
}

const ParcelsTable: React.FC<ParcelsTable_Props> = ({ isCheckBoxNeeded }) => {
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
    <CustomSection className="w-full flex flex-col justify-between xs:rounded-md lg:basis-3/5">
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {isCheckBoxNeeded ? (
                <TableCell sx={{ textAlign: 'center' }}>
                  <Checkbox></Checkbox>
                </TableCell>
              ) : null}

              <TableCell
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#6B7280',
                  fontFamily: 'inter',
                }}
              >
                Номер посылки
              </TableCell>
              <TableCell
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#6B7280',
                  fontFamily: 'inter',
                }}
              >
                Вес, кг
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {parcelsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((parcelInfo) => {
                return (
                  <TableRow
                    key={parcelInfo.id}
                    sx={{ cursor: 'pointer' }}
                    className="transition delay-50 ease-in hover:bg-gray-200"
                  >
                    {isCheckBoxNeeded ? (
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Checkbox></Checkbox>
                      </TableCell>
                    ) : null}

                    <TableCell
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'inter',
                      }}
                    >
                      {parcelInfo.parcel_number}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: 'center', fontFamily: 'inter' }}
                    >
                      {parcelInfo.weight}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={parcelsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </CustomSection>
  );
};

export default ParcelsTable;
