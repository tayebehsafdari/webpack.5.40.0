import {log} from './logger';
import './custom.scss';
// import './../index.html';
import ImageComponent from './ImageComponent';
import ListComponent from './ListComponent';

const app = document.querySelector('#app');

app.appendChild(ImageComponent.render());
app.appendChild(ListComponent.render());

log("Hello home . . .", app);

