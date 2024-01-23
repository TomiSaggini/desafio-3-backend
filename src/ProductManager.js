import {promises as fs} from "fs"

 export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt";
        this.products = [] 
    }

    static id = 0

    addProduct = async (title, description, price, image, code,stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)


        console.log(newProduct)


        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async ()=> {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    };



    getProducts = async () => {
        let respuesta2 = await this.readProducts();
       return console.log(this.readProducts())
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        } else {
            console.log(respuesta3.find(product => product.id === id))
        };
    };

deleteProductsById = async (id) =>{
    let respuesta3 = await this.readProducts();
    let productfilter = respuesta3.filter((products) => products.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productfilter));
    console.log("Producto Eliminado");
};

    updateProducts = async({id, ...Producto}) =>{
      await this.deleteProductsById(id);
      let productOld = await this.readProducts()
      

      let productsModific = [
        {id, ...Producto},...productOld]
        await fs.writeFile(this.patch, JSON.stringify(productsModific));
    };

}


const productos = new ProductManager

//productos.addProduct("Titulo1", "Description1", 1000, "Image1", "abc121", 1)
//productos.addProduct("Titulo2", "Description2", 2000, "Image2", "abc122", 2)
//productos.addProduct("titulo3", "Description3",3000, "Image3","abc123", 3)
//productos.addProduct("Titulo4", "Description4", 4000, "Image1", "abc124", 4)
//productos.addProduct("Titulo5", "Description5", 5000, "Image1", "abc125", 5)
//productos.addProduct("Titulo6", "Description6", 6000, "Image1", "abc126", 6)
//productos.addProduct("Titulo7", "Description7", 7000, "Image1", "abc127", 7)
//productos.addProduct("Titulo8", "Description8", 8000, "Image1", "abc128", 8)
//productos.addProduct("Titulo9", "Description9", 9000, "Image9", "abc129", 9)
//productos.addProduct("Titulo10", "Description10", 10000, "Image10", "abc130", 10)

productos.getProducts();

//productos.getProductsById(3);

//productos.deleteProductsById(2)


