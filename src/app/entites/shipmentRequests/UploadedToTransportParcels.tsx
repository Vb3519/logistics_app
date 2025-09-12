// React-icons:
import { BsBoxSeamFill, BsClockHistory } from 'react-icons/bs';

// Types:
import { Parcel } from 'types/parcels.interface';

// Посылки, добавленные в транспорт:
// ---------------------------------------------------------------------------
interface UploadedToTransportParcels_Props {
  uploadedParcels: Parcel[];
}

const UploadedToTransportParcels: React.FC<UploadedToTransportParcels_Props> = (
  props
) => {
  const { uploadedParcels } = props;

  return (
    <div className="h-full pb-2 flex flex-col gap-1 border-b-2 border-b-gray-200 text-sm xl:text-base">
      <h3 className="text-secondary">Добавленные посылки</h3>
      <ul className="py-2 h-40 flex flex-col gap-2 overflow-y-auto">
        {uploadedParcels.map((parcelInfo) => {
          return (
            <li
              key={parcelInfo.parcel_number}
              className="h-full px-2 py-4 flex gap-2 items-center border-b-2 border-b-gray-300 rounded-sm bg-element_primary"
            >
              <BsBoxSeamFill className="text-secondary text-base xl:text-xl" />
              {parcelInfo.parcel_number}
            </li>
          );
        })}

        {Array.from({ length: 2 - uploadedParcels.length }).map((_, index) => {
          return (
            <li
              key={index}
              className="h-full px-2 py-4 flex gap-2 items-center rounded-sm bg-gray-100 text-secondary"
            >
              <BsClockHistory className="text-base xl:text-xl" />
              <span>Добавьте посылку</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UploadedToTransportParcels;
