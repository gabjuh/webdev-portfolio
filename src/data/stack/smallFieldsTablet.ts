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
import stackOverflowLogo from '../../assets/logos/stack_overflow_mc.svg';
import githubLogo from '../../assets/logos/github_mc.svg';
import chatGptLogo from '../../assets/logos/chatgpt.svg';

interface ISmallField {
  index: number;
  name: string;
  img: string;
}

const smallFields: ISmallField[] = [
  {
    "index": 48,
    "name": 'HTML5',
    "img": htmlLogo
  },
  {
    "index": 54,
    "name": 'CSS4',
    "img": cssLogo
  },
  {
    "index": 24,
    "name": "JavaScript",
    "img": jsLogo
  },
  {
    "index": 45,
    "name": 'Bootstrap 4',
    "img": bootstrapLogo
  },
  {
    "index": 29,
    "name": 'Node.JS',
    "img": nodejsLogo
  },
  {
    "index": 23,
    "name": 'PHP8',
    "img": phpLogo
  },
  {
    "index": 22,
    "name": 'MySQL',
    "img": mysqlLogo
  },
  {
    "index": 8,
    "name": 'Wordpress',
    "img": wordpressLogo
  },
  {
    "index": 7,
    "name": 'Joomla',
    "img": joomlaLogo
  },
  {
    "index": 16,
    "name": 'Laravel 8',
    "img": laravelLogo
  },
  {
    "index": 15,
    "name": 'SQLite',
    "img": sqliteLogo
  },
  {
    "index": 19,
    "name": 'git',
    "img": gitLogo
  },
  {
    "index": 53,
    "name": 'Sass',
    "img": sassLogo
  },
  {
    "index": 20,
    "name": 'VSCode',
    "img": vsCodeLogo
  },
  {
    "index": 6,
    "name": 'ChatGPT',
    "img": chatGptLogo
  },
  {
    "index": 11,
    "name": 'Github Copilot',
    "img": copilotLogo
  },
  {
    "index": 28,
    "name": 'Photoshop CC',
    "img": psLogo
  },
  {
    "index": 35,
    "name": 'InDesign CC',
    "img": indesignLogo
  },
  {
    "index": 12,
    "name": 'Stack Overflow',
    "img": stackOverflowLogo
  },
  {
    "index": 18,
    "name": 'Github',
    "img": githubLogo
  }
];

export default smallFields;