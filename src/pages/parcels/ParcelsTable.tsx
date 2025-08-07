import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

// State:
import {
  loadParcelsData,
  selectParcels,
  selectIsParcelsDataLoading,
} from '../../app/redux/slices/parcelsSlice';

// Types:
import { AppDispatch } from '../../app/redux/store';
import { Parcel } from '../../app/redux/slices/parcelsSlice';

// Api:
import { PARCELS_URL } from '../../shared/api/logistics_appApi';

interface ParcelsTable_Props {
  isCheckBoxNeeded: boolean;
}

const ParcelsTable: React.FC<ParcelsTable_Props> = ({ isCheckBoxNeeded }) => {
  const dispatch: AppDispatch = useDispatch();

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

  // Загрузка данных по посылкам:
  // -----------------------------------
  const currentParcelsData: Parcel[] = useSelector(selectParcels);
  const isParcelsDataLoading: boolean = useSelector(selectIsParcelsDataLoading);

  useEffect(() => {
    if (currentParcelsData.length === 0 && !isParcelsDataLoading) {
      dispatch(loadParcelsData(PARCELS_URL));
    }
  }, []);

  return (
    <CustomSection className="w-full min-h-[70vh] flex flex-col justify-between bg-section_primary xs:rounded-md lg:basis-3/5">
      <TableContainer sx={{ maxHeight: '70vh' }}>
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
              {isCheckBoxNeeded ? (
                <TableCell
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#6B7280',
                    fontFamily: 'inter',
                    padding: '14px',
                    backgroundColor: '#e5e7eb',
                  }}
                >
                  <Checkbox></Checkbox>
                </TableCell>
              ) : null}

              <TableCell
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#6B7280',
                  fontFamily: 'inter',
                  padding: '14px',
                  backgroundColor: '#e5e7eb',
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
                  padding: '14px',
                  backgroundColor: '#e5e7eb',
                }}
              >
                Вес, кг
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentParcelsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((parcelInfo) => {
                return (
                  <ParcelsTableRow
                    key={parcelInfo.id}
                    isCheckBoxNeeded={isCheckBoxNeeded}
                    parcelData={parcelInfo}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={currentParcelsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </CustomSection>
  );
};

export default ParcelsTable;

// Ряд с данными о посылке из таблицы посылок:
// -------------------------------------------------------
interface ParcelsTableRow_Props {
  isCheckBoxNeeded: boolean;
  parcelData: {
    id: string;
    parcel_number: string;
    parcel_weight: string;
    parcel_status:
      | 'Изменен адрес отправки'
      | 'Проблема с упаковкой'
      | 'Вышел из строя транспорт';
    isSelected?: boolean;
  };
}

const ParcelsTableRow: React.FC<ParcelsTableRow_Props> = memo((props) => {
  const { isCheckBoxNeeded, parcelData } = props;

  console.log('ParcelsTableRow rendered');

  return (
    <TableRow>
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
        {parcelData.parcel_number}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', fontFamily: 'inter' }}>
        {parcelData.parcel_weight}
      </TableCell>
    </TableRow>
  );
});
