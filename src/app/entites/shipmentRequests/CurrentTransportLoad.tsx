// React-icons:
import { BsTruckFlatbed } from 'react-icons/bs';

// Utils:
import { calcTransportLoad } from 'shared/utils/calcTransportLoad';

// Текущая загруженность транспорта:
// ---------------------------------------------------------------------------
interface CurrentTransportLoad_Props {
  currentVal: number;
  maxVal: number;
}
const CurrentTransportLoad: React.FC<CurrentTransportLoad_Props> = ({
  currentVal,
  maxVal,
}) => {
  const transportLoadProgressColor = calcTransportLoad(currentVal, maxVal);

  return (
    <div className="h-full p-4 flex items-center justify-between gap-2 flex-wrap text-sm lg:gap-6 lg:flex-nowrap xl:text-base 2xl:gap-12">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-secondary lg:text-nowrap xl:text-base">
          Доступно, кг
        </span>

        <div>
          <span className="text-lg xs:text-xl xl:text-2xl">{currentVal}</span>
          <span className="text-lg text-secondary xs:text-xl xl:text-2xl">
            /{maxVal}
          </span>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <progress
          className={`absolute w-22 h-15 top-5 left-0 border-2 border-gray-400/70 transport_load ${transportLoadProgressColor} xl:w-34.5 xl:h-21.5 xl:top-10`}
          value={currentVal}
          max={maxVal}
        ></progress>
        <BsTruckFlatbed className="text-9xl text-gray-500/40 xl:text-[200px]" />
      </div>
    </div>
  );
};

export default CurrentTransportLoad;
