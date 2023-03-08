import React, { useState } from 'react';
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
  const gap: number = 5;
  const bigFields = [
    {
      "index": 36,
      "name": "React",
      "img": reactLogo
    },
    {
      "index": 43,
      "name": 'typescript',
      "img": typescriptLogo
    },
    {
      "index": 50,
      "name": "TailwindCSS",
      "img": tailwindLogo
    }
  ];
  const smallFields = [
    {
      "index": 51,
      "name": 'html',
      "img": htmlLogo
    },
    {
      "index": 59,
      "name": 'css',
      "img": cssLogo
    },
    {
      "index": 35,
      "name": "JavaScript",
      "img": jsLogo
    },
    {
      "index": 58,
      "name": 'bootstrap',
      "img": bootstrapLogo
    },
    {
      "index": 42,
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
      "index": 67,
      "name": 'sass',
      "img": sassLogo
    }
  ];
  const hiddenFields = [100,
    0, 1, 3, 4, 5, 71, 61, 53, 39, 30, 31, 21, 10, 77, 78, 79, 80, 76, 75, 74, 73, 65, 54, 32, 7, 14, 15, 25, 55, 48, 47, 69, 70, 60, 8, 17
  ];

  return (
    <>
      <div className="min-h-[80vh] -translate-x-[300px] lg:translate-x-[100px] translate-y-[1rem] z-0">
        <div className="relative h-[800px]" style={{ transform: "perspective(1700px) rotateX(20deg) rotate(5deg)" }}>
          <div className="absolute w-[770px]">
            <div className={`grid grid-cols-${cols} gap-${gap}`}>

              {[...Array(81)].map((_, i) => {
                let isBigger = false;
                let isHidden = hiddenFields.includes(i);
                let name = '';
                let s = size;
                let img = '';
                const foundBigFieldObj = bigFields.find(obj => obj.index === i);
                const foundSmallFieldObj = smallFields.find(obj => obj.index === i);

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
                  <>
                    {!isHidden ? (
                      <Field
                        name={name}
                        img={img}
                        size={s}
                        isBigger={isBigger}
                        pos={[0, 0]}
                        color="#464"
                        i={i}
                        showIndexes={showIndexes}
                        cols={cols}
                      />
                    ) : (
                      <div style={{ width: `${size}px`, height: `${size}px` }}></div>
                    )}
                  </>
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