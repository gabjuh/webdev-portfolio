import htmlLogo from '../../assets/logos/html_mc.svg';
import cssLogo from '../../assets/logos/css_mc.svg';
import jsLogo from '../../assets/logos/js_mc.svg';
import bootstrapLogo from '../../assets/logos/bootstrap_mc.svg';
import nodejsLogo from '../../assets/logos/nodejs_mc.svg';
import phpLogo from '../../assets/logos/php_mc.svg';
import mysqlLogo from '../../assets/logos/mysql_mc.svg';
import wordpressLogo from '../../assets/logos/wordpress_mc.svg';
import joomlaLogo from '../../assets/logos/joomla_mc.svg';
import laravelLogo from '../../assets/logos/laravel_mc.svg';
import sqliteLogo from '../../assets/logos/sqlite_mc.svg';
import gitLogo from '../../assets/logos/git_mc.svg';
import sassLogo from '../../assets/logos/sass_mc.svg';
import psLogo from '../../assets/logos/ps_mc.svg';
import vsCodeLogo from '../../assets/logos/vscode_mc.svg';
import indesignLogo from '../../assets/logos/indesign_mc.svg';
import copilotLogo from '../../assets/logos/copilot_mc.svg';

interface ISmallField {
  index: number;
  name: string;
  img: string;
}

const smallFields: ISmallField[] = [
  {
    "index": 77,
    "name": 'HTML5',
    "img": htmlLogo
  },
  {
    "index": 68,
    "name": 'CSS4',
    "img": cssLogo
  },
  {
    "index": 35,
    "name": "JavaScript",
    "img": jsLogo
  },
  {
    "index": 65,
    "name": 'Bootstrap 4',
    "img": bootstrapLogo
  },
  {
    "index": 43,
    "name": 'Node.JS',
    "img": nodejsLogo
  },
  {
    "index": 34,
    "name": 'PHP8',
    "img": phpLogo
  },
  {
    "index": 33,
    "name": 'MySQL',
    "img": mysqlLogo
  },
  {
    "index": 13,
    "name": 'Wordpress',
    "img": wordpressLogo
  },
  {
    "index": 12,
    "name": 'Joomla',
    "img": joomlaLogo
  },
  {
    "index": 24,
    "name": 'Laravel 8',
    "img": laravelLogo
  },
  {
    "index": 23,
    "name": 'SQLite',
    "img": sqliteLogo
  },
  {
    "index": 26,
    "name": 'git',
    "img": gitLogo
  },
  {
    "index": 76,
    "name": 'Sass',
    "img": sassLogo
  },
  {
    "index": 27,
    "name": 'VSCode',
    "img": vsCodeLogo
  },
  // {
  //   "index": 53,
  //   "name": 'Chat-GPT',
  //   "img": sassLogo
  // },
  {
    "index": 64,
    "name": 'Copilot',
    "img": copilotLogo
  }
  ,
  {
    "index": 41,
    "name": 'Photoshop CC',
    "img": psLogo
  },
  {
    "index": 42,
    "name": 'InDesign CC',
    "img": indesignLogo
  }
];

export default smallFields;