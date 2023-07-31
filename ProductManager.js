class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            throw new Error('Todos los campos son obligatorios al agregar un producto.');
        }

       
        const existingProduct = this.products.find((product) => product.code === code);
        if (existingProduct) {
            throw new Error('El código del producto ya existe. Debe ser único.');
        }

        const product = {
            id: this.nextId,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        };

        this.products.push(product);
        this.nextId++;
    }

    getProducts() {
        return this.products;
    }

    getProductByCode(code) {
        return this.products.find((product) => product.code === code);
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.error('Producto no encontrado. ID: ' + id);
        }
        return product;
    }

    removeProductByCode(code) {
        this.products = this.products.filter((product) => product.code !== code);
    }
}

const pm = new ProductManager();


const products1 = pm.getProducts();
console.log(products1); 


pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(pm.getProducts()); 


try {
    pm.addProduct('otro producto', 'Otra descripción', 150, 'Otra imagen', 'abc123', 10);
    console.log('La prueba no arrojó el error esperado.');
} catch (error) {
    console.log(error.message);
}


const products2 = pm.getProducts();
const product = pm.getProductById(products2[0].id);
console.log(product); 


try {
    const nonExistingProduct = pm.getProductById(999);
    console.log('La prueba no arrojó el error esperado.');
} catch (error) {
    console.log(error.message); 
}