/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useAppSelector } from '../../../hooks/store';
import { useUserActions } from '../../../hooks/useLoginActions';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  setExpand: (value: boolean) => void;
}

const Navbar: FC<SidebarProps> = ({ setExpand }) => {
  const login = useAppSelector((state) => state.login);
  const { logout } = useUserActions();
  const navigate = useNavigate();

  const username = login.user;
  const profilePic =
    'https://img.mbiz.web.id/180x180/erp/R2p1IXoyVEpBMk01WOEAdaI3hHVlkuIg0wW5_pn-CJCKHSrA_n1-U1tfE7Bl5H4_4Z7AxgL0DPOmUCdPuCHHC5lWvMU5Ig3t1uDrkVN53MlWlnA';

  const [openedMenu, setOpenedMenu] = useState<Record<string, any>>({});
  const [activeName, setActiveName] = useState('');
  const activeLink = window.location.pathname;

  /* Constants */
  const isExpandOnHover = false;

  const listRef = useRef<Record<string, HTMLUListElement | null>>({});

  const [isExpand, setIsExpand] = useState(true);

  const handleNavigate = (path: string) => {
    setActiveName(path);
  };

  const handleToggle = (name: string) => {
    const rootEl = name.split('.')[0];

    if (openedMenu[name]?.open === true) {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: false,
          height: '0px',
        },
        [rootEl]: {
          open: rootEl === name ? false : true,
          height: `${(listRef.current[rootEl]?.scrollHeight || 0) - (listRef.current[name]?.scrollHeight || 0)}px`,
        },
      }));
    } else {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: true,
          height: `${listRef.current[name]?.scrollHeight || 0}px`,
        },
        [rootEl]: {
          open: true,
          height: `${(listRef.current[rootEl]?.scrollHeight || 0) + (listRef.current[name]?.scrollHeight || 0)}px`,
        },
      }));
    }
  };

  const generateIcon = (icon: string) => {
    var icons_map: Record<string, JSX.Element> = {};
    icons_map['administration'] = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    );
    icons_map['users'] = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    );

    return icons_map[icon];
  };

  const generateMenu = (item: any, index: number, recursive: number = 0) => {
    if (activeName === '' && activeLink.includes(item.link)) {
      setActiveName(item.name);
    }
    const classesActive = activeName === item.name ? 'active' : '';

    return (
      <li key={index}>
        <a
          role="button"
          tabIndex={0}
          id={item.id}
          onClick={() => {
            if (item.link) {
              handleNavigate(item.name);
            } else {
              handleToggle(item.name);
            }
          }}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === 'Space') {
              if (item.link) {
                handleNavigate(item.name);
              } else {
                handleToggle(item.name);
              }
            }
          }}
          className={[
            'group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none',
            recursive === 0 ? 'pl-4' : recursive === 1 ? 'pl-11' : 'pl-16',
            activeName === item.name || activeName.split('.')[0] === item.name
              ? `text-blue-600 font-semibold ${item.parent ? 'bg-blue-200/20 ' : 'bg-transparent'}`
              : `text-slate-500 ${item.parent && ''}`,
            'hover:bg-slate-300/20',
            classesActive,
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            {item.icon ? (
              item.icon === 'dot' ? (
                <div className="h-3 w-3 flex items-center justify-center">
                  <div
                    className={[
                      `${classesActive ? 'h-2 w-2' : 'h-1 w-1'}`,
                      'bg-current rounded-full duration-200',
                    ].join(' ')}
                  ></div>
                </div>
              ) : (
                generateIcon(item.icon)
              )
            ) : null}
            <div className={`truncate ${isExpand ? '' : isExpandOnHover ? '' : 'w-0 h-0 opacity-0'}`}>{item.name}</div>
          </div>
          {item?.children?.length > 0 ? (
            <div className={`${isExpand ? '' : isExpandOnHover ? '' : 'w-0 h-0 opacity-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            false
          )}
        </a>
        {item?.children?.length > 0 ? (
          <ul
            ref={(el) => (listRef.current[item.name] = el)}
            className={['overflow-hidden duration-300 ease-in-out', isExpand ? '' : isExpandOnHover ? '' : 'h-0'].join(
              ' ',
            )}
            style={{ maxHeight: `${openedMenu[item.name]?.height || '0px'}` }}
            key={item.name}
          >
            {item?.children.map((value: any, idx: number) => generateMenu(value, idx, recursive + 1))}
          </ul>
        ) : (
          false
        )}
      </li>
    );
  };

  const closeSesion = () => {
    navigate('/');
    logout();
  };

  return login.isLogin ? (
    <nav
      role="navigation"
      className={[
        'bg-slate-50 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0',
        'duration-300 ease-in-out md:fixed md:translate-x-0',
        `${
          isExpand ? 'bg-slate-50 w-72' : isExpandOnHover ? 'bg-slate-50/70 w-72 backdrop-blur-md' : 'bg-slate-50 w-20'
        }`,
      ].join(' ')}
    >
      <button
        className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${isExpand ? 'rotate-0' : 'rotate-180'} transform duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={`relative h-screen overflow-hidden`}>
        <SimpleBar style={{ height: '100%' }} autoHide>
          <div className="text-slate-500">
            <div className="my-8 flex flex-col items-center h-44 overflow-x-hidden">
              <div
                className={`rounded-full border-4 border-white overflow-hidden duration-300 ${
                  isExpand ? 'h-28 w-28' : isExpandOnHover ? 'h-28 w-28' : 'h-12 w-12'
                }`}
              >
                <img src={profilePic} className="block" alt="" />
              </div>
              <div
                className={`text-base font-semibold text-slate-700 mt-3 truncate duration-300 ${
                  isExpand ? '' : isExpandOnHover ? '' : 'w-0 h-0 opacity-0'
                }`}
              >
                <p className="capitalize">Hola {username}</p>
              </div>
              <div
                className={`duration-300 text-sm text-slate-500 truncate ${
                  isExpand ? '' : isExpandOnHover ? '' : 'w-0 h-0 opacity-0'
                }`}
              >
                <a onClick={closeSesion} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Cerrar Sesion
                </a>
              </div>
            </div>

            <div className="mt-3 mb-10 p-0">
              <ul className="list-none text-sm font-normal px-3">
                {login.menu.map((item, index) => generateMenu(item, index))}
              </ul>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  ) : null;
};

export default Navbar;
