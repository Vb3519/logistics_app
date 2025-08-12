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
import CustomButton from '../../../../shared/ui/CustomButton';
import CustomSection from '../../../../shared/ui/CustomSection';
import ParcelsTableRow from '../elements/ParcelsTableRow';

// Data:
import { parcelsData } from '../../../../shared/data/parcelsData';

// State:
import {
  loadParcelsData,
  selectParcels,
  selectIsParcelsDataLoading,
  uploadParcel,
  removeParcel,
  selectUploadedParcels,
} from '../../../redux/slices/parcelsSlice';

// Types:
import { AppDispatch } from '../../../redux/store';
import { Parcel } from '../../../redux/slices/parcelsSlice';

// Api:
import { PARCELS_URL } from '../../../../shared/api/logistics_appApi';

interface ParcelsTable_Props {
  isCheckBoxNeeded: boolean;
}

const ParcelsTable: React.FC<ParcelsTable_Props> = ({ isCheckBoxNeeded }) => {
  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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

  // Загрузка данных по посылкам:
  // -----------------------------------
  const currentParcelsData: Parcel[] = useSelector(selectParcels);
  const isParcelsDataLoading: boolean = useSelector(selectIsParcelsDataLoading);

  const uploadedParcels: Parcel[] = useSelector(selectUploadedParcels);
  const uploadedParcelsTotalWeight: number = uploadedParcels.reduce(
    (totalWeightVal, parcelInfo) => {
      return (totalWeightVal =
        totalWeightVal + Number(parcelInfo.parcel_weight));
    },
    0
  );

  // Добавление и удаление посылок в непроведенную заявку на отгрузку:
  // -----------------------------------
  const handleUploadParcel = (parcelData: Parcel) => {
    dispatch(uploadParcel(parcelData));
  };

  const handleRemoveParcel = (parcelId: string) => {
    dispatch(removeParcel(parcelId));
  };

  useEffect(() => {
    if (currentParcelsData.length === 0 && !isParcelsDataLoading) {
      dispatch(loadParcelsData(PARCELS_URL));
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow text-sm xs:rounded-md lg:text-base">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-[#7B57DF] title-shadow text-base">
            Доступные посылки
          </h2>
          <div className="p-2 flex flex-col gap-1 bg-element_primary border-b-2 border-b-[#cbcbcb] rounded-md xs:p-4 xs:flex-row xs:gap-6">
            <div>
              <span className="text-primary">Выбрано, шт: </span>
              <span>{uploadedParcels.length}</span>
            </div>
            <div>
              <span className="text-primary">Вес, кг: </span>
              <span>{uploadedParcelsTotalWeight}</span>
            </div>
          </div>
          <CustomButton
            disabled={uploadedParcels.length === 0}
            className={`p-2 mx-auto w-1/2 min-w-45 max-w-60 text-[whitesmoke] ${
              uploadedParcels.length === 0 ? 'bg-gray-300' : 'bg-[#7B57DF]'
            }`}
            onClick={() => console.log('Click')}
          >
            Загрузить в машину
          </CustomButton>
        </div>
      </CustomSection>

      <CustomSection className="w-full min-h-[80vh] flex flex-col justify-between bg-section_primary xs:rounded-md lg:basis-3/5">
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
                    Выбор
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
                  const isAlrdyUploaded: boolean = uploadedParcels.some(
                    (parcel) => parcel.id === parcelInfo.id
                  );

                  return (
                    <ParcelsTableRow
                      key={parcelInfo.id}
                      isCheckBoxNeeded={isCheckBoxNeeded}
                      parcelData={parcelInfo}
                      isAlrdyUploaded={isAlrdyUploaded}
                      onClick={() => {
                        if (isAlrdyUploaded) {
                          handleRemoveParcel(parcelInfo.id);
                        } else {
                          handleUploadParcel(parcelInfo);
                        }
                      }}
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
    </div>
  );
};

export default ParcelsTable;
