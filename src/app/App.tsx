import { AiOutlineCodepenCircle } from 'react-icons/ai';

import { MdOutlineSegment } from 'react-icons/md';

import { PiMagnifyingGlassBold } from 'react-icons/pi';

import { LuClipboardList } from 'react-icons/lu';
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';
import { FaAngleRight } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

// Ui:
import CustomButton from '../shared/ui/CustomButton';

const App = () => {
  return (
    <div className="font-[inter]">
      {/* -------------------- ХЕАДЕР: -------------------- */}
      {/* -------------------- ХЕАДЕР: -------------------- */}
      {/* -------------------- ХЕАДЕР: -------------------- */}
      <header className="p-2 flex justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <AiOutlineCodepenCircle className="text-4xl text-[#7B57DF]" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[#7B57DF]">Logistics App</p>
            <p className="text-xs text-gray-400">WorkSpace</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CustomButton className="hidden py-2 px-4 bg-[#7B57DF] text-[whitesmoke] text-sm xs:block">
            + Создать Заявку
          </CustomButton>

          <CustomButton className="p-2 flex items-center justify-center bg-gray-200">
            <MdOutlineSegment className="text-[#7B57DF] text-xl" />
          </CustomButton>
        </div>
      </header>

      {/* -------------------- МЕИН: -------------------- */}
      {/* -------------------- МЕИН: -------------------- */}
      {/* -------------------- МЕИН: -------------------- */}
      <main className="py-4 flex flex-col gap-4 bg-gray-100">
        {/* -------------------- СЕКЦИЯ №1: -------------------- */}
        {/* -------------------- СЕКЦИЯ №1: -------------------- */}
        {/* -------------------- СЕКЦИЯ №1: -------------------- */}
        <section className="p-2 flex items-center justify-between gap-2 text-sm bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md">
          <form className="w-full max-w-65 p-2 flex gap-1 items-center bg-gray-100 rounded-sm">
            <PiMagnifyingGlassBold className="text-2xl text-gray-300" />
            <input
              className="w-full outline-none"
              placeholder="Номер заказа..."
            />
          </form>

          <div className="font-semibold flex flex-col gap-1">
            <p className="text-nowrap">Сб, 26.07.25</p>
            <p>16:45</p>
          </div>
        </section>

        {/* -------------------- СЕКЦИЯ №2: -------------------- */}
        {/* -------------------- СЕКЦИЯ №2: -------------------- */}
        {/* -------------------- СЕКЦИЯ №2: -------------------- */}
        <section className="p-2 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md">
          <h1 className="font-semibold">Общие данные</h1>

          <ul className="py-4 flex gap-4 text-sm overflow-x-auto">
            <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
              <div className="flex flex-col gap-2">
                <p className="text-gray-500">Новые заказы</p>
                <p className="text-xl font-semibold">5</p>
              </div>
              <LuClipboardList className="text-3xl text-amber-500/70 flex-shrink-0" />
            </li>

            <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
              <div className="flex flex-col gap-2">
                <p className="text-gray-500">Готовы к отгрузке</p>
                <p className="text-xl font-semibold">2</p>
              </div>
              <BsBoxSeamFill className="text-3xl text-red-900/70 flex-shrink-0" />
            </li>

            <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
              <div className="flex flex-col gap-2">
                <p className="text-gray-500">В пути</p>
                <p className="text-xl font-semibold">8</p>
              </div>
              <FaTruck className="text-3xl text-blue-400/70 flex-shrink-0" />
            </li>

            <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
              <div className="flex flex-col gap-2">
                <p className="text-gray-500">Доставлены</p>
                <p className="text-xl font-semibold">12</p>
              </div>
              <AiOutlineFileDone className="text-3xl text-green-600/70 flex-shrink-0" />
            </li>
          </ul>
        </section>

        {/* -------------------- СЕКЦИЯ №3: -------------------- */}
        {/* -------------------- СЕКЦИЯ №3: -------------------- */}
        {/* -------------------- СЕКЦИЯ №3: -------------------- */}
        <section className="p-2 flex flex-col gap-4 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md">
          <div className="text-sm flex justify-between gap-2">
            <h2 className="font-semibold">Транспорт в пути</h2>

            <CustomButton className="flex items-center text-[#7B57DF]">
              Весь список
              <FaAngleRight />
            </CustomButton>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 rounded-l-md text-gray-500">Адрес</th>
                  <th className="p-2 text-gray-500">Автомобиль</th>
                  <th className="p-2 rounded-r-md text-gray-500">Опоздание</th>
                </tr>
              </thead>

              <tbody>
                <tr className="p-2 border-b-2 border-gray-200">
                  <td className="p-2">Санкт-Петербург - Москва</td>
                  <td className="p-2">Iveco 80E12</td>
                  <td className="p-2">Нет</td>
                </tr>

                <tr className="p-2 border-b-2 border-gray-200">
                  <td className="p-2">Санкт-Петербург - Москва</td>
                  <td className="p-2">Iveco 80E12</td>
                  <td className="p-2">Да</td>
                </tr>

                <tr className="p-2 border-b-2 border-gray-200">
                  <td className="p-2">Санкт-Петербург - Москва</td>
                  <td className="p-2">Iveco 80E12</td>
                  <td className="p-2">Нет</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------- СЕКЦИЯ №4: -------------------- */}
        {/* -------------------- СЕКЦИЯ №4: -------------------- */}
        {/* -------------------- СЕКЦИЯ №4: -------------------- */}
        <section className="p-2 flex flex-col gap-4 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md">
          <div className="text-sm flex justify-between gap-2">
            <h2 className="font-semibold">Дневной план</h2>

            <CustomButton className="flex items-center text-[#7B57DF]">
              <BsThreeDots />
            </CustomButton>
          </div>

          <div className="flex gap-2 text-sm">
            <ul className="flex flex-col gap-2">
              <li className="flex flex-col gap-1">
                <p>Собрано посылок</p>
                <p>
                  2 / <span>10</span>
                </p>
              </li>
              <li className="flex flex-col gap-1">
                <p>Создано заявок</p>
                <p>
                  3 / <span>5</span>
                </p>
              </li>
            </ul>

            <div className="w-full flex items-center justify-center bg-gray-200 rounded-md">
              Диаграмма статистики
            </div>
          </div>
        </section>

        {/* -------------------- СЕКЦИЯ №5: -------------------- */}
        {/* -------------------- СЕКЦИЯ №5: -------------------- */}
        {/* -------------------- СЕКЦИЯ №5: -------------------- */}
        <section className="p-2 flex flex-col gap-4 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md">
          <div className="text-sm flex justify-between gap-2">
            <h2 className="font-semibold">Свободный транспорт</h2>

            <CustomButton className="flex items-center text-[#7B57DF]">
              Весь список
              <FaAngleRight />
            </CustomButton>
          </div>

          <ul className="flex flex-col gap-2 text-sm">
            <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
              <div className="w-full flex flex-col gap-1">
                <p className="font-semibold">v435322</p>
                <p>Санкт-Петербург - Москва</p>
              </div>
              <div className="w-full flex flex-col justify-end">
                <p className="text-right">
                  <span className="text-amber-300">90</span> / 100%
                </p>
                <div className="h-1 bg-amber-200"></div>
              </div>
            </li>

            <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
              <div className="w-full flex flex-col gap-1">
                <p className="font-semibold">v435322</p>
                <p>Санкт-Петербург - Москва</p>
              </div>
              <div className="w-full flex flex-col justify-end">
                <p className="text-right">
                  <span className="text-amber-300">90</span> / 100%
                </p>
                <div className="h-1 bg-amber-200"></div>
              </div>
            </li>

            <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
              <div className="w-full flex flex-col gap-1">
                <p className="font-semibold">v435322</p>
                <p>Санкт-Петербург - Москва</p>
              </div>
              <div className="w-full flex flex-col justify-end">
                <p className="text-right">
                  <span className="text-amber-300">90</span> / 100%
                </p>
                <div className="h-1 bg-amber-200"></div>
              </div>
            </li>
          </ul>
        </section>
      </main>

      <footer className="p-2 flex gap-2 justify-between items-center bg-gray-300 text-gray-400">
        <div className="flex items-center gap-2">
          <AiOutlineCodepenCircle className="text-4xl" />
          <p className="font-semibold">Logistics App</p>
        </div>
        <div className="text-sm font-semibold text-gray-400 text-right">
          2025 by Viktor Bordyugov
        </div>
      </footer>
    </div>
  );
};

export default App;
