import { NavLink } from 'react-router-dom';

interface BreadCrumbs_Props extends React.LiHTMLAttributes<HTMLLIElement> {
  className?: string;
  backTopath: string;
  backToPageTitle: string;
  currentPath: string;
  currentPageTitle: string;
}

const BreadCrumbs: React.FC<BreadCrumbs_Props> = ({ ...props }) => {
  const {
    className,
    backTopath,
    backToPageTitle,
    currentPath,
    currentPageTitle,
  } = props;

  return (
    <ul
      className={`${
        className ? className : ''
      } mr-auto ml-2 p-2 gap-1 flex bg-section_primary rounded-sm text-sm container-shadow flex-wrap xs:ml-0 xs:p-4 xl:text-base`}
    >
      <li className="text-black">
        <NavLink to={backTopath}>{backToPageTitle} /</NavLink>
      </li>
      <li className="text-[#7B57DF]">
        <NavLink to={currentPath}>{currentPageTitle}</NavLink>
      </li>
    </ul>
  );
};

export default BreadCrumbs;
