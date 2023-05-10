import React, { useState, useEffect, FC } from 'react';
import icons from '../data/overview/icons';
import menuItems from '../data/menu/menuItems';
import { scrollToId } from '../helpers/pageNavigation';
import { getViewWidth } from '../helpers/getViewWidth';

interface IMenuItem {
  id: string,
  name: string,
  selectedMenuItem: string,
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
  handleMenuItemSelect: (e: any) => void;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItem: React.FC<IMenuItem> = ({
  id, name, selectedMenuItem, setSelectedMenuItem, handleMenuItemSelect, isClicked, setIsClicked
}) => {

  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMenuItem === id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedMenuItem]);

  const handleOnclick = () => {
    setSelectedMenuItem(id);
    scrollToId(id);
  };

  return (
    <div className="text-right">
      <p
        className="cursor-pointer"
        onClick={
          handleOnclick
        }
      >
        <span className={`block pr-4 h-[100%] w-[100%] text-[#444a] hover:text-[#2ea18c] transition-all duration-[.4s] ease-in-out ${isSelected ? 'text-[#2ea18c] font-semibold text-[1.2rem] py-[.7rem]' : 'font-light text-[.85rem]'}`}>
          {name}
        </span>
      </p>
    </div>
  );
}

const StickyMenu = () => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(getViewWidth() > 1024);

  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(menuItems[0].id);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleMenuItemSelect = (e: any) => {
    setSelectedMenuItem(e.target.id);
    // scrollToId(text);
  };

  const handleOnclick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuArrowObj = icons.find(icon => icon.name === 'menuArrow');
  const menuIco = menuArrowObj?.img;

  // Create an object of menuitem ids and their y positions
  const menuItemsYPos = menuItems.map(item => {
    const el = document.querySelector(`#${item.id}`);
    const yPos = el instanceof HTMLElement ? el.offsetTop : 0;
    return { id: item.id, yPos: yPos };
  });

  // Get the current scroll position
  const scrollPos = window.scrollY;

  // Get the current menu item id
  // const currentMenuItemId = menuItemsYPos.find(item => item.yPos > scrollPos)?.id;
  const [currentMenuItemId, setCurrentMenuItemId] = useState<string>(menuItemsYPos.find(item => item.yPos > scrollPos)?.id || '');

  // Set the current menu item id
  // useEffect(() => {
  //   // setSelectedMenuItem(currentMenuItemId || '');
  //   console.log(currentMenuItemId);
  // }, [scrollPos]);


  // Set the current menu item id
  // useEffect(() => {
  //   const scrollPos = window.scrollY;
  //   const currentMenuItemId = menuItemsYPos.find(item => item.yPos > scrollPos)?.id;
  //   console.log(currentMenuItemId);
  //   setCurrentMenuItemId(currentMenuItemId || '');
  // }, []);

  // scroll eventlistener
  useEffect(() => {
    const handleScroll = () => {
      // const scrollPos = window.scrollY;
      // const currentMenuItemId = menuItemsYPos.find((item, i, arr) => arr[i + 1].yPos - 280 > scrollPos)?.id;
      // console.log(currentMenuItemId);
      // setSelectedMenuItem(currentMenuItemId || '');
      getViewWidth() < 1024 && setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className={`fixed top-[50vh] right-0 -translate-y-[50%] z-[999] ${!isMenuOpen ? 'translate-x-[150px]' : ''} transition-all duration-[.5s] ease-in-out`}>
      <div className={`group relative py-7 float-right z-50 w-[160px] rounded-l-3xl backdrop-blur-md bg-[#eeeb] `}>
        {/* {menu ico} */}
        <div className="group absolute top-[50%] -translate-y-[50%] -left-[30px] py-4 pl-4 cursor-pointer rounded-l-[50px] bg-[#eeeb] backdrop-blur-md transition-all duration-[.5s] ease-in-ou z-[999]" onClick={(handleOnclick)}>
          {menuIco && <img src={menuIco} alt="Menu" className={`w-[18px] h-[18px] ${isMenuOpen ? 'translate-x-[1.5px]' : '-translate-x-[3.5px]'} group-hover:opacity-90 opacity-50 transition-all duration-[.5s] ease-in-out ${isMenuOpen ? 'rotate-[-180deg]' : ''}`} />}
        </div>

        {menuItems.map((item, index) => {
          return (
            <MenuItem
              key={`menu-item-${index}`}
              id={item.id}
              name={item.name}
              selectedMenuItem={selectedMenuItem}
              setSelectedMenuItem={setSelectedMenuItem}
              handleMenuItemSelect={handleMenuItemSelect}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StickyMenu;