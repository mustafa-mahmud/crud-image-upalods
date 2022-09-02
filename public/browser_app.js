import UI from './js/UI.js';
import Helper from './js/Helper.js';

const uiCL = new UI();

Helper.getAllProducts().then((data) => uiCL.display(data.data.products));
