/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useMemo, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { useNavigate } from 'react-router-dom';
import { INavigate } from './models/sidebarOptions';

import Category from '../../icons/category';
import Products from '../../icons/products';

import Administration from '../../icons/administration';
import Money from '../../icons/money';
import Purchase from '../../icons/purchase';
import CreditCard from '../../icons/creditCard';
import Inventory from '../../icons/inventory';

interface SidebarProps {
  setExpand: (value: boolean) => void;
}

const Navbar: FC<SidebarProps> = ({ setExpand }) => {
  const navigate = useNavigate();

  const profilePic =
    'https://img.mbiz.web.id/180x180/erp/R2p1IXoyVEpBMk01WOEAdaI3hHVlkuIg0wW5_pn-CJCKHSrA_n1-U1tfE7Bl5H4_4Z7AxgL0DPOmUCdPuCHHC5lWvMU5Ig3t1uDrkVN53MlWlnA';

  const [openedMenu, setOpenedMenu] = useState<Record<string, any>>({});
  const [activeName, setActiveName] = useState('');
  const activeLink = window.location.pathname;

  /* Constants */
  const isExpandOnHover = false;

  const listRef = useRef<Record<string, HTMLUListElement | null>>({});

  const [isExpand, setIsExpand] = useState(true);

  const handleNavigate = (item: INavigate) => {
    const { name, link } = item;
    setActiveName(name);
    navigate(link);
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

    icons_map['category'] = <Category />;
    icons_map['products'] = <Products />;
    icons_map['administration'] = <Administration />;
    icons_map['money'] = <Money />;
    icons_map['purchase'] = <Purchase />;
    icons_map['sell'] = <CreditCard />;
    icons_map['control'] = <Inventory />;

    return icons_map[icon];
  };

  const menu = useMemo(() => {
    return [
      {
        name: 'Mantenedores',
        icon: 'administration',
        children: [
          { name: 'Categorias', icon: 'category', link: '/category' },
          { name: 'Productos', icon: 'products', link: '/products' },
        ],
      },
      {
        name: 'Inventario',
        icon: 'money',
        children: [
          { name: 'Compras', icon: 'purchase', link: '/purchase' },
          { name: 'Ventas', icon: 'sell', link: '/sell' },
          { name: 'Control', icon: 'control', link: '/control' },
        ],
      },
    ];
  }, []);

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
              handleNavigate(item);
            } else {
              handleToggle(item.name);
            }
          }}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === 'Space') {
              if (item.link) {
                handleNavigate(item);
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

  return (
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
                <p className="capitalize">Hola Servitek</p>
              </div>
              <div
                className={`duration-300 text-sm text-slate-500 truncate ${
                  isExpand ? '' : isExpandOnHover ? '' : 'w-0 h-0 opacity-0'
                }`}
              ></div>
            </div>

            <div className="mt-3 mb-10 p-0">
              <ul className="list-none text-sm font-normal px-3">
                {menu.map((item, index) => generateMenu(item, index))}
              </ul>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  );
};

export default Navbar;
