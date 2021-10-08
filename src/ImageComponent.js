import './custom.scss';

import avatar from './avatar.jpg';
import _ from 'lodash';

_.map([1, 2], item => console.log(item));

class ImageComponent {
    createImageTag() {
        const image = document.createElement('img');
        image.classList.add('img-fluid');
        image.src = avatar;
        image.alt = 'avatar';
        return image;
    }

    createTextTag() {
        const text = document.createElement('h2');
        // text.innerHTML = 'text';
        text.innerText = 'text';
        return text;
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('image-box');
        // element.innerHTML = 'image-box';
        element.appendChild(this.createImageTag());
        element.appendChild(this.createTextTag());
        return element;
    }
}

export default new ImageComponent();