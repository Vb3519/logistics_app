import { useSelector } from 'react-redux';

// React-icons:
import { BsThreeDots } from 'react-icons/bs';
import { LuClipboardList } from 'react-icons/lu';
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { MdDone } from 'react-icons/md';
import { GiPartyPopper } from 'react-icons/gi';

// Ui:
import CustomButton from 'shared/ui/CustomButton';
import CustomSection from 'shared/ui/CustomSection';

// State:
import {
  selectAllActionsCounter,
  selectDailyParcelsCollected,
  selectDailyShipmentsCreated,
  selectDailyShipmentsApproved,
} from 'app/redux/slices/dailyPlanSlice';

// Constants:
import { DAILY_PLAN_LIMITS } from 'shared/constants/logisticAppContants';

const DailyPlan = () => {
  const allActionsCounter = useSelector(selectAllActionsCounter);
  const parcelsCollected = useSelector(selectDailyParcelsCollected);
  const shipmentsCreated = useSelector(selectDailyShipmentsCreated);
  const shipmentsApproved = useSelector(selectDailyShipmentsApproved);

  const calcProgressPercent = (
    actionsCounter: number,
    actionsLimit: number
  ) => {
    const progressPercent: number = Math.floor(
      (actionsCounter / actionsLimit) * 100
    );

    return progressPercent;
  };

  const progressPercentVal = calcProgressPercent(
    allActionsCounter,
    DAILY_PLAN_LIMITS.actionsTotalLimit
  );

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
            actionsDone={parcelsCollected}
            actionsTotal={DAILY_PLAN_LIMITS.parcelsLimit}
          />

          <DailyPlanElement
            icon={
              <LuClipboardList className="text-2xl flex-shrink-0 text-secondary xl:text-3xl" />
            }
            title="Создано заявок"
            actionsDone={shipmentsCreated}
            actionsTotal={DAILY_PLAN_LIMITS.shipmentsCreatedLimit}
          />

          <DailyPlanElement
            icon={
              <FaTruck className="text-2xl flex-shrink-0 text-secondary xl:text-3xl" />
            }
            title="Проведено отгрузок"
            actionsDone={shipmentsApproved}
            actionsTotal={DAILY_PLAN_LIMITS.shipmentsApprovedLimit}
          />
        </ul>

        <div className="p-2 w-full flex items-center justify-center border-b-2 border-b-[#cbcbcb] bg-element_primary rounded-md">
          <div className="p-2 w-full flex flex-col items-center justify-center gap-2">
            {allActionsCounter === DAILY_PLAN_LIMITS.actionsTotalLimit ? (
              <GiPartyPopper className="text-5xl text-secondary sm:text-7xl 2xl:text-8xl" />
            ) : (
              <GiProgression className="text-5xl text-secondary sm:text-7xl 2xl:text-8xl" />
            )}

            <div className="w-2/3 flex flex-col gap-2">
              <p className="text-base text-nowrap text-center">
                <span className="text-primary">{progressPercentVal} </span>
                <span className="text-secondary">/ 100%</span>
              </p>

              <div className="hidden w-full h-2 bg-gray-400/50 rounded-sm sm:block">
                <div
                  style={{ width: `${progressPercentVal}%` }}
                  className={`h-2 bg-green-700 rounded-sm`}
                ></div>
              </div>
            </div>

            <p className="text-secondary text-center sm:text-base">
              {allActionsCounter === 0 && 'Приступите к работе'}

              {allActionsCounter > 0 &&
                allActionsCounter < DAILY_PLAN_LIMITS.actionsTotalLimit &&
                'Выполняется...'}

              {allActionsCounter === DAILY_PLAN_LIMITS.actionsTotalLimit &&
                'План выполнен!'}
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

      <div className="flex items-center gap-2">
        <p className="text-base xl:text-lg">
          <span>{actionsDone} </span>
          <span className="text-primary">/ {actionsTotal}</span>
        </p>
        {actionsDone === actionsTotal && (
          <MdDone className="text-xl text-green-700" />
        )}
      </div>
    </li>
  );
};
