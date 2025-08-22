// Utils:
import { calcTransportLoadProgressColor } from '../../../../../../shared/utils/calcTransportLoad';

interface PercentageOfCarLoad_Props {
  current_load_value: number;
  max_load_value: number;
}

const PercentageOfCarLoad: React.FC<PercentageOfCarLoad_Props> = ({
  current_load_value,
  max_load_value,
}) => {
  return (
    <div className="p-4 h-full flex-1 flex items-center gap-2 text-sm border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md xl:text-base">
      <p>Загруженность машины</p>

      <span
        className={`ml-auto text-2xl ${calcTransportLoadProgressColor(
          current_load_value,
          max_load_value
        )} lg:text-3xl`}
      >
        {Math.floor((current_load_value / max_load_value) * 100)}%
      </span>
    </div>
  );
};

export default PercentageOfCarLoad;
