// Types:
import { AppDispatch } from '../../../../redux/store';

// State:
import { updateShipmentRequestsByStatus } from '../../../../redux/slices/shipmentsSlice';
import { updateParcelsByIsAttached } from '../../../../redux/slices/parcelsSlice';
import { setShipmentStatus } from '../../../../redux/slices/shipmentStatusSlice';

const stateUpdateAfterApprove = (dispatch: AppDispatch) => {
  dispatch(updateShipmentRequestsByStatus(''));
  dispatch(updateParcelsByIsAttached(false));
  dispatch(setShipmentStatus(''));
};

export default stateUpdateAfterApprove;
