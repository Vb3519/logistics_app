import { createAsyncThunk } from '@reduxjs/toolkit';

// Utils:
import serverResponseImitation from '../../../../shared/utils/serverResponseImitation';

// Types:
import { ShipmentRequest } from '../../../../types/shipments.interface';

// Загрузка с api данных по непроведенным заявкам на отгрузку:
// ---------------------------------------------------
export const loadShipmentRequestsData = createAsyncThunk(
  'shipments/loadShipmentRequestsData',
  async (url: string, thunkApi) => {
    try {
      await serverResponseImitation(2000);

      const shipmentRequestsDataResponse: Response = await fetch(url);

      if (shipmentRequestsDataResponse.ok) {
        const shipmentRequestsData: ShipmentRequest[] =
          await shipmentRequestsDataResponse.json();

        console.log(
          'Данные по непроведенным заявкам на отгрузку:',
          shipmentRequestsData
        );

        return shipmentRequestsData;
      } else {
        const errorMsg: string = `HTTP Error: ${shipmentRequestsDataResponse.status} ${shipmentRequestsDataResponse.statusText}`;
        console.log(errorMsg);

        return thunkApi.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;

      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);

export default loadShipmentRequestsData;
