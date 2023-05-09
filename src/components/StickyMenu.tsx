import React, { useState, useEffect } from 'react';
import icons from '../data/overview/icons';
import menuItems from '../data/menu/menuItems';
import { getViewWidth } from '../helpers/getViewWidth';

interface IMenuItem {
  text: string,
  href: string,
  selectedMenuItem: string,
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
  handleMenuItemSelect: (e: any) => void;
}

const MenuItem: React.FC<IMenuItem> = ({
  text, href, selectedMenuItem, setSelectedMenuItem, handleMenuItemSelect
}) => {

  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMenuItem === text) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedMenuItem]);

  return (
    <div className="text-right">
      <a href={href}
        onClick={(() => {
          setSelectedMenuItem(text);
        }
        )}

      >
        <span className={`block pr-4 h-[100%] w-[100%] text-[#444a] hover:text-[#2ea18c] transition-all duration-[.4s] ease-in-out ${isSelected ? 'text-[#2ea18c] font-semibold text-[1.2rem] py-[.7rem]' : 'font-light text-[.85rem]'}`}>
          {text}
        </span>
      </a>
    </div>
  );
}

const StickyMenu = () => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(menuItems[0].name);

  const handleMenuItemSelect = (e: any) => {
    setSelectedMenuItem(e.target.id);
    // scrollToId(text);
  };

  const handleOnclick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuArrowObj = icons.find(icon => icon.name === 'menuArrow');
  const menuIco = menuArrowObj?.img;



  return (
    <div className={`fixed top-[50vh] right-0 -translate-y-[50%] z-[999]`}>
      <div className={`group relative py-3 float-right z-50 w-[160px] rounded-l-3xl backdrop-blur-md bg-[#ddd5] ${!isMenuOpen ? 'translate-x-[150px]' : ''} transition-all duration-[.5s] ease-in-out`}>
        {/* {menu ico} */}
        <div className="group absolute top-[50%] -translate-y-[50%] -left-[30px] py-4 pl-4 cursor-pointer rounded-l-[50px] bg-[#ddd5] backdrop-blur-md transition-all duration-[.5s] ease-in-ou z-[999]" onClick={(handleOnclick)}>
          {menuIco && <img src={menuIco} alt="Menu" className={`w-[18px] h-[18px] ${isMenuOpen ? 'translate-x-[1.5px]' : '-translate-x-[3.5px]'} group-hover:opacity-90 opacity-50 transition-all duration-[.5s] ease-in-out ${isMenuOpen ? 'rotate-[-180deg]' : ''}`} />}
        </div>

        {menuItems.map((item, index) => {
          return (
            <MenuItem
              key={`menu-item-${index}`}
              text={item.name}
              href={item.link}
              selectedMenuItem={selectedMenuItem}
              setSelectedMenuItem={setSelectedMenuItem}
              handleMenuItemSelect={handleMenuItemSelect}

            />
          );
        })}
      </div>
    </div>
  );
};

export default StickyMenu;