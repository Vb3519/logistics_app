import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// MUI:
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';
import ParcelsPageTableSkeleton from '../elements/skeletons/ParcelsPageTableSkeleton';

// State:
import {
  selectParcelsData,
  selectIsParcelsDataLoading,
} from '../../../redux/slices/parcelsSlice';

// Services:
import loadParcelsData from '../services/loadParcelsData';

// Types:
import { Parcel } from '../../../../types/parcels.interface';
import { AppDispatch } from '../../../redux/store';

// Api:
import { PARCELS_URL } from '../../../../shared/api/logistics_appApi';

const ParcelsPageTable = () => {
  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(12);

  const parcelsData: Parcel[] = useSelector(selectParcelsData);
  const isParcelsDataLoading: boolean = useSelector(selectIsParcelsDataLoading);

  // Работа с таблицей:
  // ---------------------
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    if (parcelsData.length === 0 && !isParcelsDataLoading) {
      dispatch(loadParcelsData(PARCELS_URL));
    }
  }, []);

  return (
    <CustomSection className="w-full min-h-[80vh] flex flex-col justify-between bg-section_primary xs:rounded-md">
      <TableContainer sx={{ maxHeight: '80vh' }}>
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
              <TableCell
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#6B7280',
                  fontFamily: 'inter',
                  padding: '14px',
                  backgroundColor: '#e5e7eb',
                  fontSize: {
                    xs: '14px',
                    '@media (min-width:1280px)': {
                      fontSize: '16px',
                    },
                  },
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
                  fontSize: {
                    xs: '14px',
                    '@media (min-width:1280px)': {
                      fontSize: '16px',
                    },
                  },
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
                  <TableRow key={parcelInfo.id}>
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        textAlign: 'center',
                        fontFamily: 'inter',
                        fontSize: {
                          xs: '14px',
                          '@media (min-width:1280px)': {
                            fontSize: '16px',
                          },
                        },
                      }}
                    >
                      <div className="w-40 flex items-center gap-2">
                        <BsBoxSeamFill className="h-10.5 text-lg text-secondary xl:text-xl" />
                        {parcelInfo.parcel_number}
                      </div>
                    </TableCell>

                    <TableCell
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'inter',
                        fontSize: {
                          xs: '14px',
                          '@media (min-width:1280px)': {
                            fontSize: '16px',
                          },
                        },
                      }}
                    >
                      {parcelInfo.parcel_weight}
                    </TableCell>
                  </TableRow>
                );
              })}

            {/* ПЛЕЙСХОЛДЕРЫ ДЛЯ ТАБЛИЦЫ БЕЗ ЧЕКБОКСОВ: */}
            {Array.from({
              length:
                rowsPerPage -
                parcelsData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).length,
            }).map((_, index) => {
              return (
                <ParcelsPageTableSkeleton
                  key={index}
                  isParcelsDataLoading={isParcelsDataLoading}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[12, 24, 48]}
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

export default ParcelsPageTable;
