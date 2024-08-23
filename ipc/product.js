const { ipcMain } = require("electron");
const { product } = require("../controller");

const productIPC = () => {
  //  Get all products
  ipcMain.handle("get-products", async (_e, data) => {
    try {
      return await product.getProducts({ page: data.page, size: data.size });
    } catch (error) {
      console.error("Error in get-products IPC handler:", error);
      throw error;
    }
  });

  //  Get product count
  ipcMain.handle("get-product-count", async (_e) => {
    try {
      return await product.getProductCount({ page, size });
    } catch (error) {
      console.error("Error in get-product-count IPC handler:", error);
      throw error;
    }
  });

  //  Get single product
  ipcMain.handle("get-single-product", async (_e, id) => {
    try {
      return await product.getProductById(id);
    } catch (error) {
      console.error("Error in get-single-product IPC handler:", error);
      throw error;
    }
  });

  //  Create a new product
  ipcMain.handle("create-product", async (_e, productName) => {
    try {
      return await product.createProduct(productName);
    } catch (error) {
      console.error("Error in create-product IPC handler:", error);
      throw error;
    }
  });

  //  Delete a product
  ipcMain.handle("delete-product", async (_e, { id }) => {
    try {
      return await product.deleteProductById({ id });
    } catch (error) {
      console.error("Error in create-product IPC handler:", error);
      throw error;
    }
  });
};

module.exports = productIPC;
