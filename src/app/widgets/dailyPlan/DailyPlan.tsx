// React-icons:
import { BsThreeDots } from 'react-icons/bs';
import { LuClipboardList } from 'react-icons/lu';
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';

// Ui:
import CustomButton from '../../../shared/ui/CustomButton';
import CustomSection from '../../../shared/ui/CustomSection';

const DailyPlan = () => {
  return (
    <CustomSection className="flex flex-col gap-4 bg-section_primary xs:mx-4">
      <div className="flex justify-between gap-2 text-sm xl:text-base">
        <h2 className="font-semibold text-[#7B57DF] title-shadow">
          Дневной план
        </h2>

        <CustomButton className="flex items-center text-[#7B57DF]">
          <BsThreeDots className="text-lg xl:text-xl" />
        </CustomButton>
      </div>

      <div className="h-full flex gap-2 text-sm xl:text-base">
        <ul className="h-full w-full flex flex-col gap-2">
          <DailyPlanElement
            icon={
              <BsBoxSeamFill className="text-xl flex-shrink-0 text-secondary xl:text-2xl" />
            }
            title="Собрано посылок"
            actionsDone={0}
            actionsTotal={3}
          />

          <DailyPlanElement
            icon={
              <LuClipboardList className="text-2xl flex-shrink-0 text-secondary xl:text-3xl" />
            }
            title="Создано заявок"
            actionsDone={0}
            actionsTotal={2}
          />

          <DailyPlanElement
            icon={
              <FaTruck className="text-2xl flex-shrink-0 text-secondary xl:text-3xl" />
            }
            title="Проведено отгрузок"
            actionsDone={0}
            actionsTotal={1}
          />
        </ul>

        <div className="p-2 w-full flex items-center justify-center border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md">
          <div className="p-2 w-full flex flex-col items-center justify-center gap-2">
            <GiProgression className="text-5xl text-secondary sm:text-7xl 2xl:text-8xl" />
            <div className="w-2/3 flex flex-col gap-2">
              <p className="text-base text-nowrap text-center">
                <span className="text-secondary">0 </span>
                <span className="text-primary">/ 100%</span>
              </p>
              <progress className="hidden h-2 w-full mx-auto daily_plan text-secondary sm:block"></progress>
            </div>
            <p className="text-secondary text-center sm:text-base">
              Приступите к работе
            </p>
          </div>
        </div>
      </div>
    </CustomSection>
  );
};

export default DailyPlan;

interface DailyPlanElement_Props extends React.LiHTMLAttributes<HTMLLIElement> {
  icon: React.ReactNode;
  title: 'Собрано посылок' | 'Создано заявок' | 'Проведено отгрузок';
  actionsDone: number;
  actionsTotal: number;
}

// Компонент списка дневного плана:
// ------------------------------------
const DailyPlanElement: React.FC<DailyPlanElement_Props> = ({
  icon,
  title,
  actionsDone,
  actionsTotal,
  ...props
}) => {
  return (
    <li
      className="h-full p-2 flex flex-col gap-1 bg-element_primary border-b-2 border-b-[#cbcbcb] rounded-md xs:gap-2 sm:p-4"
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon}
        <p>{title}</p>
      </div>

      <p className="text-base xl:text-lg">
        <span>{actionsDone} </span>
        <span className="text-primary">/ {actionsTotal}</span>
      </p>
    </li>
  );
};
