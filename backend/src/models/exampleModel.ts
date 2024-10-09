interface Item {
    id: number;
    name: string;
}

class ExampleModel {
    private items: Item[];

    constructor() {
        this.items = [];
    }

    findAll(): Item[] {
        return this.items;
    }

    create(item: Item): Item {
        this.items.push(item);
        return item;
    }
}

export default new ExampleModel();