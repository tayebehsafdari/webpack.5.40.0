import './another-custom.scss';

class ListComponent {
    createItem(title) {
        const item = document.createElement('li');
        item.innerText = title;
        return item;
    }

    render() {
        const element = document.createElement('ul');
        element.appendChild(this.createItem('item 1'));
        element.appendChild(this.createItem('item 2'));
        element.appendChild(this.createItem('item 3'));
        element.appendChild(this.createItem('item 4'));
        element.appendChild(this.createItem('item 5'));
        element.appendChild(this.createItem('item 6'));
        element.appendChild(this.createItem('item 7'));
        return element;
    }
}

export default new ListComponent();