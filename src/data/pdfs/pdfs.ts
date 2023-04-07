import softwareOperatorTechnikum from '../../pdfs/software_operator_technikum.pdf';
import diplomGitarre from '../../pdfs/diplom-gitarre.pdf';
import b1Deutsch from '../../pdfs/b1-deutsch.pdf';
import zertifikatHalle from '../../pdfs/zertifikat-halle.pdf';
import empfehlungSchueler from '../../pdfs/empfehlung-schueler.pdf';
import arbeitszeugnisLuebeck from '../../pdfs/arbeitszeugnis-luebeck.pdf';
import empfehlungHfk from '../../pdfs/empfehlung-hfk.pdf';
import empfehlungInline from '../../pdfs/empfehlung-inline-kurier.pdf';
import webdesignZeugnis from '../../pdfs/webdesign-usability-certificate.pdf';
import javascriptZeugnis from '../../pdfs/moderne-webanwendungen-mit-javascript-certificate.pdf';
import phpZeugnis from '../../pdfs/moderne-webanwendungen-mit-php-mysql-certificate.pdf';

interface IPdfs {
  id: string;
  name: string;
  url: string;
}

// List of pdfs
const pdfs: IPdfs[] = [
  {
    id: 'software_operator_technikum',
    name: 'Software Operator Prüfung - 2005',
    url: softwareOperatorTechnikum,
  },
  {
    id: 'elektrotechnik-abitur',
    name: '',
    url: '',
  },
  {
    id: 'diplom-gitarre',
    name: 'Klassische Gitarre BA Diplom - 2010',
    url: diplomGitarre,
  },
  {
    id: 'b1-deutsch',
    name: 'B1 Sprachprüfung - 2014',
    url: b1Deutsch,
  },
  {
    id: 'zertifikat-halle',
    name: 'Mittelstufe II - 2014',
    url: zertifikatHalle,
  },
  {
    id: 'diplom-laute',
    name: 'Laute, Alte Musik BA Diplom - 2018',
    url: '',
  },
  {
    id: 'empfehlung-schueler',
    name: 'Von Schüler - 2018',
    url: empfehlungSchueler,
  },
  {
    id: 'arbeitszeugnis-luebeck',
    name: 'Von Schulleiter - 2018 (1.Seite)',
    url: arbeitszeugnisLuebeck,
  },
  {
    id: 'arbeitszeugnis-luebeck-cms',
    name: 'Von Schulleiter - 2018 (2.Seite)',
    url: arbeitszeugnisLuebeck,
  },
  {
    id: 'empfehlung-hfk',
    name: 'Von meinem Professor - 2017',
    url: empfehlungHfk,
  },
  {
    id: 'empfehlung-inline-kurier',
    name: 'iKV Hamburg - 2018',
    url: empfehlungInline,
  },
  {
    id: 'webdesign-usability-certificate',
    name: 'Webmasters Europe e.V. - 2021',
    url: webdesignZeugnis,
  },
  {
    id: 'moderne-webanwendungen-mit-javascript-certificate',
    name: 'Webmasters Europe e.V. - 2022',
    url: javascriptZeugnis,
  },
  {
    id: 'moderne-webanwendungen-mit-php-mysql-certificate',
    name: 'Webmasters Europe e.V. - 2022',
    url: phpZeugnis,
  },
];

export default pdfs;