import React, { Fragment, useState } from 'react';
import Field from './Field';
import Hero from './Hero';
import jsLogo from '../assets/logos/js_mc.svg';
import reactLogo from '../assets/logos/react_mc.svg';
import tailwindLogo from '../assets/logos/tailwind_mc.svg';
import htmlLogo from '../assets/logos/html_mc.svg';
import cssLogo from '../assets/logos/css_mc.svg';
import typescriptLogo from '../assets/logos/typescript_mc.svg';
import bootstrapLogo from '../assets/logos/bootstrap_mc.svg';
import nodejsLogo from '../assets/logos/nodejs_mc.svg';
import phpLogo from '../assets/logos/php_mc.svg';
import mysqlLogo from '../assets/logos/mysql_mc.svg';
import wordpressLogo from '../assets/logos/wordpress_mc.svg';
import joomlaLogo from '../assets/logos/joomla_mc.svg';
import laravelLogo from '../assets/logos/laravel_mc.svg';
import sqliteLogo from '../assets/logos/sqlite_mc.svg';
import gitLogo from '../assets/logos/git_mc.svg';
import sassLogo from '../assets/logos/sass_mc.svg';

const Stack = () => {

  const [showIndexes, setShowIndexes] = useState<Boolean>(false);
  const size: number = 60;
  const cols: number = 10;
  const gap: number = 4;
  const bigFields = [
    {
      "index": 56,
      "name": "React",
      "img": reactLogo
    },
    {
      "index": 44,
      "name": 'typescript',
      "img": typescriptLogo
    },
    {
      "index": 36,
      "name": "TailwindCSS",
      "img": tailwindLogo
    }
  ];
  const smallFields = [
    {
      "index": 58,
      "name": 'html',
      "img": htmlLogo
    },
    {
      "index": 68,
      "name": 'css',
      "img": cssLogo
    },
    {
      "index": 35,
      "name": "JavaScript",
      "img": jsLogo
    },
    {
      "index": 65,
      "name": 'bootstrap',
      "img": bootstrapLogo
    },
    {
      "index": 43,
      "name": 'nodejs',
      "img": nodejsLogo
    },
    {
      "index": 34,
      "name": 'php',
      "img": phpLogo
    },
    {
      "index": 33,
      "name": 'mysql',
      "img": mysqlLogo
    },
    {
      "index": 13,
      "name": 'wordpress',
      "img": wordpressLogo
    },
    {
      "index": 12,
      "name": 'joomla',
      "img": joomlaLogo
    },
    {
      "index": 24,
      "name": 'laravel',
      "img": laravelLogo
    },
    {
      "index": 23,
      "name": 'sqlite',
      "img": sqliteLogo
    },
    {
      "index": 26,
      "name": 'git',
      "img": gitLogo
    },
    {
      "index": 76,
      "name": 'sass',
      "img": sassLogo
    }
  ];
  const hiddenFields = [100,
    0, 1, 2, 4, 5, 7, 8, 10, 14, 15, 17, 21, 25, 30, 31, 32, 40, 51, 52, 60, 61, 62, 70, 74, 78, 79, 80, 82, 83, 84, 85, 86, 87, 89
  ];

  const skipList: number[] = [];

  bigFields.forEach(item => {
    skipList.push(item.index + 1, item.index + 10, item.index + 11);
  });

  const fieldArray = [...Array(90)].map((_, i) => i).filter(id => !skipList.includes(id));

  return (
    <>
      <div className="min-h-[80vh] -translate-x-[300px] lg:translate-x-[100px] translate-y-[1rem] z-0">
        <div className="relative h-[800px]" style={{ transform: "perspective(1700px) rotateX(20deg) rotate(5deg)" }}>
          <div className="absolute w-[770px]">
            <div
              className={`grid grid-cols-10 gap-5`}

            >

              {fieldArray.map(id => {
                let isBigger = false;
                let isHidden = hiddenFields.includes(id);
                let name = '';
                let s = size;
                let img = '';
                const foundBigFieldObj = bigFields.find(obj => obj.index === id);
                const foundSmallFieldObj = smallFields.find(obj => obj.index === id);

                if (foundBigFieldObj) {
                  s = size * 2.2;
                  isBigger = true;
                  name = foundBigFieldObj.name;
                  img = foundBigFieldObj.img;
                }

                if (foundSmallFieldObj) {
                  name = foundSmallFieldObj.name;
                  img = foundSmallFieldObj.img;
                }

                return (
                  <React.Fragment key={id}>
                    {!isHidden ? (
                      <Field
                        name={name}
                        img={img}
                        size={s}
                        isBigger={isBigger}
                        pos={[0, 0]}
                        color="#464"
                        i={id}
                        showIndexes={showIndexes}
                        cols={cols}
                      />
                    ) : (
                      <div style={{ width: `${size}px`, height: `${size}px` }}></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="relative w-[420px]">
            <Hero />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stack;