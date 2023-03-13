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
  const bigFieldSize: number = size * 2.3;
  const cols: number = 10;
  const gap: number = 17;
  const nrOfFields: number = 90;
  const maxWidth: number = 770
  const bigFields = [
    {
      "index": 36,
      "name": "React",
      "img": reactLogo
    },
    {
      "index": 44,
      "name": 'typescript',
      "img": typescriptLogo
    },
    {
      "index": 56,
      "name": "TailwindCSS",
      "img": tailwindLogo
    }
  ];
  const smallFields = [
    {
      "index": 40,
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
  const hiddenFields = [200,
    0, 1, 2, 4, 5, 7, 8, 10, 14, 15, 17, 21, 25, 30, 31, 32, 40, 51, 52, 60, 61, 62, 70, 74, 78, 79, 80, 82, 83, 84, 85, 86, 87, 89
  ];

  const skipList: number[] = [];

  // Skip items, that has index:
  // n + 1, 
  // n + cols, 
  // n + cols + 1,
  bigFields.forEach(item => {
    skipList.push(item.index + 1, item.index + cols, item.index + cols + 1);
  });

  const fieldArray = [...Array(nrOfFields)].map((_, i) => i).filter(id => !skipList.includes(id));

  return (
    <>
      <div className="container min-h-[800px] mx-auto py-10">
        <div className={`relative max-w-[1020px] mx-auto`} style={{ transform: "perspective(2500px) rotateX(20deg)" }}>
          <div className="relative mx-auto right-0 left-0">
            <div className="grid grid-cols-8">
              <div className={`grid col-span-6 max-w-[770px]`}
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gap: `${gap}px`
                }}
              >

                {fieldArray.map(id => {
                  let isBig = false;
                  let type: 'empty' | 'normal' | 'smallWithIco' | '2x1' | '2x2' = 'normal';
                  let isHidden = hiddenFields.includes(id);
                  let name = '';
                  let width = size;
                  let height = size;
                  let img = '';
                  const foundBigFieldObj = bigFields.find(obj => obj.index === id);
                  const foundSmallFieldObj = smallFields.find(obj => obj.index === id);

                  if (foundBigFieldObj) {
                    width = bigFieldSize;
                    height = bigFieldSize;
                    isBig = true;
                    type = '2x2';
                    name = foundBigFieldObj.name;
                    img = foundBigFieldObj.img;
                  }

                  if (foundSmallFieldObj) {
                    width = size;
                    height = size;
                    name = foundSmallFieldObj.name;
                    img = foundSmallFieldObj.img;
                  }

                  return (
                    <React.Fragment key={id}>
                      {!isHidden ? (
                        <Field
                          name={name}
                          img={img}
                          size={[width, height]}
                          isBig={isBig}
                          type={type}
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
              <div className="col-span-2">
                <Hero />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stack;