import { Injectable } from '@nestjs/common';
import {
  deleteSaffronSaleDto,
  editClientDto,
  editSupplierDto,
  genericAddDto,
  genericEditDto,
  genericFindDto,
  registerProductDto,
  registerProjectDto,
  reportDto,
  saveClientDto,
  saveExpenseDto,
  saveProductInventoryDepleteDto,
  saveProductInventoryRestockDto,
  saveProjectInventoryDepleteDto,
  saveProjectInventoryRestockDto,
  saveSaffronSaleDto,
  saveSaleDto,
  saveSupplierDto,
  updateExpenseDto,
  viewExpenseDto,
} from './dto/equatorial_shop.dto';
import { PrismaService } from './prisma/prisma.service';
import { IProduct } from './interfaces/product';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  /*shop products inventory*/
  async registerProduct(dto: registerProductDto) {
    try {
      const ISBN_code = Math.floor(Math.random() * 10000000000000);
      await this.prismaService
        .$queryRaw`INSERT INTO product (name, price, barcode, category_id) VALUES (${dto.name}, ${dto.price}, ${ISBN_code}, ${dto.category_id})`;

      const productsList = await this.getAllProducts();
      return {
        statusCode: 200,
        message: 'Product has been successfully registered',
        data: productsList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while registering product',
        data: error,
      };
    }
  }

  async getAllProducts() {
    try {
      const productsList: IProduct[] = await this.prismaService
        .$queryRaw`SELECT * FROM product`;

      const sortedProducts = productsList.sort((a: IProduct, b: IProduct) => {
        const prodBDate = new Date(b.createdAt).getTime();
        const prodADate = new Date(a.createdAt).getTime();
        return prodBDate - prodADate;
      });
      return {
        statusCode: 200,
        message: 'Product list has been fetched successfully',
        data: sortedProducts,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching product list',
        data: error,
      };
    }
  }

  async editProduct(dto: genericEditDto) {
    try {
      const { id, ...updateData } = dto;

      const setParts = Object.entries(updateData)
        .map(
          ([key, value]) =>
            `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
        )
        .join(', ');

      const sql = `UPDATE product SET ${setParts} WHERE product_id = ${id}`;

      const result = await this.prismaService.$executeRawUnsafe(sql);

      if (result === 0) {
        return {
          statusCode: 404,
          message: 'Product not found',
        };
      }

      const updatedProducts = await this.getAllProducts();

      return {
        statusCode: 200,
        message: 'Product updated successfully',
        data: updatedProducts.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while updating product',
        data: error,
      };
    }
  }

  async getProduct(id: number) {
    try {
      const productData = await this.prismaService
        .$queryRaw`SELECT * FROM eshopinventory JOIN product ON eshopinventory.product_id = product.product_id WHERE eshopinventory.product_id = ${id}`;

      return {
        statusCode: 200,
        message: 'Product data has been fetched successfully',
        data: productData,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching product',
        data: error,
      };
    }
  }

  async shopRestock(dto: saveProductInventoryRestockDto) {
    try {
      const items = JSON.parse(dto.items);

      const updatedPromises = items.map(
        async (item: {
          product_id: number;
          quantity: string;
          units: number;
        }) => {
          const product: [] = await this.prismaService
            .$queryRaw`SELECT * FROM eshopinventory WHERE product_id = ${item.product_id} AND units = ${item.units}`;
          if (product.length === 0) {
            await this.prismaService
              .$executeRaw`INSERT INTO eshopinventory (product_id, quantity, units) VALUES (${item.product_id}, ${item.quantity}, ${item.units})`;
          } else {
            await this.prismaService
              .$executeRaw`UPDATE eshopinventory SET quantity = quantity + ${parseInt(item.quantity)} WHERE product_id = ${item.product_id} AND units = ${item.units}`;
          }
        },
      );

      await Promise.all(updatedPromises);

      await this.prismaService
        .$executeRaw`INSERT INTO eshoprestockrecord (items, source, notes, transaction_date, authorized_by) VALUES (${dto.items}, ${dto.source}, ${dto.notes}, ${dto.transaction_date}, ${dto.authorized_by})`;

      const updatedRecords = await this.getProductRestockRecords();

      return {
        statusCode: 200,
        message: 'Product restock successful',
        data: updatedRecords,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while restocking product',
        data: error,
      };
    }
  }

  async depleteStock(dto: saveProductInventoryDepleteDto) {
    try {
      const insufficientItems = [];
      const items = JSON.parse(dto.items);

      const promises = items.map(
        async (item: {
          product_id: number;
          quantity: number;
          units: number;
        }) => {
          const product = await this.prismaService
            .$queryRaw`SELECT quantity FROM eshopinventory WHERE product_id = ${item.product_id} AND units = ${item.units}`;
          const qtyInStock = product[0]?.quantity || 0;
          if (qtyInStock >= item.quantity) {
            return Promise.resolve();
          } else {
            insufficientItems.push(item.product_id);
            return Promise.reject();
          }
        },
      );

      try {
        await Promise.all(promises);
      } catch (error) {
        // If any item had insufficient stock, return here
        if (insufficientItems.length > 0) {
          return {
            statusCode: 400,
            message: 'Insufficient stock for some items',
            data: insufficientItems,
          };
        }
        throw error; // rethrow other errors
      }

      // Update the stock quantities
      const updatePromises = items.map(
        async (item: { product_id: number; quantity: number }) => {
          await this.prismaService
            .$executeRaw`UPDATE eshopinventory SET quantity = quantity - ${item.quantity} WHERE product_id = ${item.product_id}`;
        },
      );

      // Wait for all stock updates to complete
      await Promise.all(updatePromises);

      await this.prismaService
        .$queryRaw`INSERT INTO eshopStocktakeoutrecord (product_id, quantity, units, destination, notes, transaction_date, authorized_by) VALUES (${dto.items}, ${dto.destination}, ${dto.notes}, ${dto.transaction_date}, ${dto.authorized_by})`;

      const updatedRecords = await this.getProductDepleteRecords();

      return {
        statusCode: 200,
        message: 'Product depletion successful',
        data: updatedRecords,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while depleting product',
        data: error,
      };
    }
  }

  async getEquatorialShopStock() {
    try {
      const stockData = await this.prismaService
        .$executeRaw`SELECT * FROM eshopinventory JOIN product ON eshopinventory.product_id = product.product_id`;

      return {
        statusCode: 200,
        message: 'Inventory stock levels have been fetched',
        data: stockData,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching inventory stock levels',
        data: error,
      };
    }
  }

  async getProductRestockRecords() {
    try {
      const restockRecords = await this.prismaService
        .$queryRaw`SELECT * FROM eshoprestockrecord JOIN product ON eshoprestockrecord.product_id = product.product_id`;

      return {
        statusCode: 200,
        message: 'Product restock records have been fetched',
        data: restockRecords,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching product restock records',
        data: error,
      };
    }
  }

  async getProductDepleteRecords() {
    try {
      const depleteRecords = await this.prismaService
        .$queryRaw`SELECT * FROM eshopStocktakeoutrecord JOIN product ON eshopStocktakeoutrecord.product_id = product.product_id`;

      return {
        statusCode: 200,
        message: 'Product deplete records have been fetched',
        data: depleteRecords,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching product deplete records',
        data: error,
      };
    }
  }

  async deleteProduct(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE FROM product WHERE product_id = ${dto.id}`;

      const updatedProducts = await this.getAllProducts();

      return {
        statusCode: 200,
        message: 'Product has been deleted successfully',
        data: updatedProducts.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting product',
        data: error,
      };
    }
  }
  async deleteProductRestockRecord(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE * FROM eshoprestockrecord WHERE record_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Restock record has been deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting restock record',
        data: error,
      };
    }
  }
  async deleteProductDepletionRecord(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE * FROM eshoprestockrecord WHERE record_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Depletion record has been deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting depletion record',
        data: error,
      };
    }
  }

  /*projects inventory*/
  async registerProject(dto: registerProjectDto) {
    try {
      const ISBN_code = Math.floor(Math.random() * 10000000000000);
      await this.prismaService
        .$queryRaw`INSERT INTO project (name, price, barcode) VALUES (${dto.name}, ${dto.price}, ${ISBN_code})`;

      const projectsList = await this.getAllProjects();
      return {
        statusCode: 200,
        message: 'Project has been registered successfully',
        data: projectsList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while registering project',
        data: error,
      };
    }
  }

  async editProject(dto: genericEditDto) {
    try {
      const { id, ...updateData } = dto;

      const setParts = Object.entries(updateData)
        .map(
          ([key, value]) =>
            `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
        )
        .join(', ');

      const sql = `UPDATE project SET ${setParts} WHERE project_id = ${id}`;

      const result = await this.prismaService.$executeRawUnsafe(sql);

      if (result === 0) {
        return {
          statusCode: 404,
          message: 'Project not found',
        };
      }

      const updatedProjects = await this.getAllProjects();

      return {
        statusCode: 200,
        message: 'Project updated successfully',
        data: updatedProjects.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while updating project',
        data: error,
      };
    }
  }

  async getProject(dto: genericFindDto) {
    try {
      const projectData = await this.prismaService
        .$executeRaw`SELECT * FROM eprojectsinventory JOIN product ON eprojectsinventory.project_id = project.project_id WHERE project.project_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Product data has been fetched successfully',
        data: projectData,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching project',
        data: error,
      };
    }
  }

  async getAllProjects() {
    try {
      const projectsList = await this.prismaService
        .$queryRaw`SELECT * FROM project;`;

      return {
        statusCode: 200,
        message: 'Project list has been fetched successfully',
        data: projectsList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching project list',
        data: error,
      };
    }
  }

  async projectsRestock(dto: saveProjectInventoryRestockDto) {
    try {
      const items = JSON.parse(dto.items);

      const updatedPromises = items.map(
        async (item: {
          project_id: number;
          quantity: number;
          units: string;
        }) => {
          const project: [] = await this.prismaService
            .$queryRaw`SELECT * FROM eprojectsinventory WHERE project_id = ${item.project_id}`;

          if (project.length > 0) {
            await this.prismaService
              .$executeRaw`UPDATE eprojectsinventory SET quantity = quantity + ${item.quantity} WHERE project_id = ${item.project_id}`;
          } else {
            await this.prismaService
              .$executeRaw`INSERT INTO eprojectsinventory (project_id, quantity, units) VALUES
            (${item.project_id}, ${item.quantity}, '${item.units}');`;
          }
        },
      );

      await Promise.all(updatedPromises);

      const updatedRecords = await this.getProjectRestockRecords();

      return {
        statusCode: 200,
        message: 'Projects restock successful',
        data: updatedRecords.data,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Error while restocking project',
        data: error,
      };
    }
  }

  async depleteProjects(dto: saveProjectInventoryDepleteDto) {
    try {
      const insufficientItems: number[] = [];
      const items: { project_id: number; quantity: number }[] = JSON.parse(
        dto.items,
      );

      // Check stock for all items
      for (const item of items) {
        const project = await this.prismaService.$queryRaw`
          SELECT quantity FROM eprojectsinventory WHERE project_id = ${item.project_id}`;
        const qtyInStock = project[0]?.quantity || 0;
        if (qtyInStock < item.quantity) {
          insufficientItems.push(item.project_id);
        }
      }

      if (insufficientItems.length > 0) {
        return {
          statusCode: 400,
          message: 'Insufficient stock for some items',
          data: insufficientItems,
        };
      }

      // Update the stock quantities
      const updatePromises = items.map(
        (item) =>
          this.prismaService.$executeRaw`
          UPDATE eprojectsinventory SET quantity = quantity - ${item.quantity} WHERE project_id = ${item.project_id}`,
      );

      await Promise.all(updatePromises);

      const updatedRecords = await this.getProjectDepleteRecords();

      return {
        statusCode: 200,
        message: 'Project depletion successful',
        data: updatedRecords.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while depleting project',
        data: error.message || error,
      };
    }
  }

  async getEquatorialProjectStock() {
    try {
      const stockData = await this.prismaService
        .$executeRaw`SELECT * FROM eprojectsinventory JOIN project ON eprojectsinventory.project_id = project.project_id`;

      return {
        statusCode: 200,
        message: 'Project stock levels have been fetched',
        data: stockData,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching project stock levels',
        data: error,
      };
    }
  }

  async getProjectRestockRecords() {
    try {
      const restockRecords = await this.prismaService
        .$executeRaw`SELECT * FROM eshopprojectrestockrecord JOIN product ON eshopprojectrestockrecord.product_id = product.product_id`;

      return {
        statusCode: 200,
        message: 'Project restock records have been fetched',
        data: restockRecords,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching project restock records',
        data: error,
      };
    }
  }

  async getProjectDepleteRecords() {
    try {
      const restockRecords = await this.prismaService
        .$executeRaw`SELECT * FROM eshopprojecttakeoutrecord JOIN product ON eshopprojecttakeoutrecord.product_id = product.product_id`;
      return {
        statusCode: 200,
        message: 'Project deplete records have been fetched',
        data: restockRecords,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching project deplete records',
        data: error,
      };
    }
  }

  async deleteProject(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE * FROM project WHERE project_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Project has been deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting project',
        data: error,
      };
    }
  }
  async deleteProjectRestockRecord(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE * FROM eshopprojectrestockrecord WHERE record_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Restock record has been deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting restock record',
        data: error,
      };
    }
  }
  async deleteProjectDepletionRecord(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE * FROM eshopprojecttakeoutrecord WHERE record_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Depletion record has been deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting depletion record',
        data: error,
      };
    }
  }

  /*expenditure*/
  async saveExpense(dto: saveExpenseDto) {
    await this.prismaService
      .$executeRaw`INSERT INTO eshopexpense (date, category, name, description, cost, balance, payment_method, payment_status, receipt_image) VALUES (${dto.date}, ${dto.category}, ${dto.name}, ${dto.description}, ${dto.cost}, ${dto.balance}, ${dto.payment_method}, ${dto.payment_status}, ${dto.receipt_image})`;
    const expenseList = await this.getAllExpenses();

    return {
      statusCode: 201,
      message: 'Expense saved successfully',
      data: expenseList.data,
    };
  }

  async getAllExpenses() {
    try {
      const expensesList = await this.prismaService
        .$queryRaw`SELECT expense_id, date, category, name, description, cost, balance, receipt_image, createdAt FROM eshopexpense`;

      return {
        statusCode: 200,
        message: 'Expenses retrieved successfully',
        data: expensesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving expenses',
        data: error,
      };
    }
  }

  async getExpense(dto: viewExpenseDto) {
    try {
      const expense = await this.prismaService
        .$queryRaw`SELECT expense_id, date, category, name, description, cost, balance, receipt_image, createdAt FROM eshopexpense WHERE expense_id = ${dto.expense_id}`;

      return {
        statusCode: 200,
        message: 'Expense retrieved successfully',
        data: expense,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving expense',
        data: error,
      };
    }
  }

  async editExpense(dto: updateExpenseDto) {
    try {
      const { expense_id, ...updateData } = dto;

      const setParts = Object.entries(updateData)
        .map(
          ([key, value]) =>
            `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
        )
        .join(', ');

      const sql = `UPDATE eshopexpense SET ${setParts} WHERE expense_id = ${expense_id}`;

      const result = await this.prismaService.$executeRawUnsafe(sql);

      if (result === 0) {
        return {
          statusCode: 404,
          message: 'Expense not found',
        };
      }

      const updatedExpenses = await this.getAllExpenses();

      return {
        statusCode: 200,
        message: 'Expense updated successfully',
        data: updatedExpenses.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while updating expense',
        data: error,
      };
    }
  }

  async deleteExpense(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE FROM eshopexpense WHERE expense_id = ${dto.id}`;

      const newExpenseList = await this.getAllExpenses();

      return {
        statusCode: 200,
        message: 'Expense record has been deleted successfully',
        data: newExpenseList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting expense',
        data: error,
      };
    }
  }

  //clients
  async saveNewClient(dto: saveClientDto) {
    try {
      await this.prismaService
        .$executeRaw`INSERT INTO client (first_name, last_name, email, phone, address) VALUES (${dto.first_name}, ${dto.last_name}, ${dto.email}, ${dto.contact}, ${dto.address})`;
      const clientsList = await this.getAllClients();

      return {
        statusCode: 201,
        message: 'Client saved successfully',
        data: clientsList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while saving client',
        data: error,
      };
    }
  }
  async editClient(dto: editClientDto) {
    try {
      const { client_id, ...updateData } = dto;

      const setParts = Object.entries(updateData)
        .map(
          ([key, value]) =>
            `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
        )
        .join(', ');

      const sql = `UPDATE client SET ${setParts} WHERE client_id = ${client_id}`;

      const result = await this.prismaService.$executeRawUnsafe(sql);

      if (result === 0) {
        return {
          statusCode: 404,
          message: 'Client not found',
        };
      }

      const updatedClientList = await this.getAllClients();

      return {
        statusCode: 200,
        message: 'Client updated successfully',
        data: updatedClientList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while updating client',
        data: error,
      };
    }
  }

  async getAllClients() {
    try {
      const clientList = await this.prismaService
        .$queryRaw`SELECT * FROM client`;

      return {
        statusCode: 200,
        message: 'Clients retrieved successfully',
        data: clientList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving clients',
        data: error,
      };
    }
  }

  async getClient(dto: genericFindDto) {
    try {
      const newClientList: [] = await this.prismaService
        .$queryRaw`SELECT * FROM client WHERE client_id = ${dto.id}`;

      if (newClientList.length > 0) {
        return {
          statusCode: 200,
          message: 'Client retrieved successfully',
          data: newClientList,
        };
      } else {
        return {
          statusCode: 400,
          message: 'No client found',
          data: newClientList,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving client',
        data: error,
      };
    }
  }

  async deleteClient(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE FROM client WHERE client_id = ${dto.id}`;

      const newClientList = await this.getAllClients();

      return {
        statusCode: 200,
        message: 'Client has been deleted successfully',
        data: newClientList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting client',
        data: error,
      };
    }
  }

  async getClientPurchasesList(dto: genericFindDto) {
    try {
      const productPurchasesList: {
        items: string;
        totalCost: string;
        createdAt: string;
      }[] = await this.prismaService
        .$queryRaw`SELECT items, totalCost, createdAt FROM eshopsales WHERE client_id = ${dto.id}`;

      const projectPurchasesList: {
        items: string;
        totalCost: string;
        createdAt: string;
      }[] = await this.prismaService
        .$queryRaw`SELECT items, totalCost, createdAt FROM eprojectssales WHERE client_id = ${dto.id}`;

      const combinedPurchasesList = [
        ...productPurchasesList,
        ...projectPurchasesList,
      ];

      const sortedList: {
        items: string;
        totalCost: string;
        createdAt: string;
      }[] = combinedPurchasesList.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      return {
        statusCode: 200,
        message: 'Client purhases listing has been successfully retrieved',
        data: sortedList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving client purchases listing',
        data: error,
      };
    }
  }

  //suppliers
  async saveNewSupplier(dto: saveSupplierDto) {
    try {
      await this.prismaService
        .$executeRaw`INSERT INTO supplier (first_name, last_name, email, phone, address) VALUES (${dto.first_name}, ${dto.last_name}, ${dto.email}, ${dto.contact}, ${dto.address})`;
      const suppliersList = await this.getAllSuppliers();

      return {
        statusCode: 201,
        message: 'Supplier saved successfully',
        data: suppliersList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while saving supplier',
        data: error,
      };
    }
  }

  async editSupplier(dto: editSupplierDto) {
    try {
      const { supplier_id, ...updateData } = dto;

      const setParts = Object.entries(updateData)
        .map(
          ([key, value]) =>
            `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
        )
        .join(', ');

      const sql = `UPDATE supplier SET ${setParts} WHERE supplier_id = ${supplier_id}`;

      const result = await this.prismaService.$executeRawUnsafe(sql);

      if (result === 0) {
        return {
          statusCode: 404,
          message: 'Supplier not found',
        };
      }

      const updatedSupplierList = await this.getAllSuppliers();

      return {
        statusCode: 200,
        message: 'Supplier updated successfully',
        data: updatedSupplierList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while updating supplier information',
        data: error,
      };
    }
  }

  async getAllSuppliers() {
    try {
      const suppliersList = await this.prismaService
        .$queryRaw`SELECT * FROM supplier`;

      return {
        statusCode: 200,
        message: 'Suppliers retrieved successfully',
        data: suppliersList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving suppliers',
        data: error,
      };
    }
  }

  async getSupplier(dto: genericFindDto) {
    try {
      const suppliersList: [] = await this.prismaService
        .$queryRaw`SELECT * FROM supplier WHERE supplier_id = ${dto.id}`;

      if (suppliersList.length > 0) {
        return {
          statusCode: 200,
          message: 'Supplier retrieved successfully',
          data: suppliersList,
        };
      } else {
        return {
          statusCode: 400,
          message: 'No supplier found',
          data: suppliersList,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving supplier',
        data: error,
      };
    }
  }

  async deleteSupplier(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE FROM supplier WHERE supplier_id = ${dto.id}`;

      const newSuppliersList = await this.getAllSuppliers();

      return {
        statusCode: 200,
        message: 'Supplier has been deleted successfully',
        data: newSuppliersList.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting supplier',
        data: error,
      };
    }
  }

  async getSupplierSuppliesList(dto: genericFindDto) {
    try {
      const suppliesList = await this.prismaService
        .$queryRaw`SELECT * FROM supplyrecords WHERE supplier_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Supplies listing has been successfully retrieved',
        data: suppliesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving supplies listing',
        data: error,
      };
    }
  }

  //massage
  async getIncomeEntries() {
    try {
      const entriesList: { createdAt: any }[] = await this.prismaService
        .$queryRaw`SELECT * FROM massageincome`;

      const sortedList = entriesList.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      if (entriesList.length > 0) {
        return {
          statusCode: 200,
          message: 'Income entries listing has been successfully retrieved',
          data: sortedList,
        };
      } else {
        return {
          statusCode: 404,
          message: 'No income entries found',
          data: null,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving incomes entries list',
        data: null,
      };
    }
  }

  async approveEntry(dto: genericEditDto) {
    try {
      const entry: [] = await this.prismaService
        .$queryRaw`SELECT * FROM massageincome WHERE submission_id = ${dto.id}`;

      if (entry.length > 0) {
        await this.prismaService
          .$queryRaw`UPDATE massageincome SET status = approved WHERE submission_id = ${dto.id}`;

        const updatedEntriesList = await this.getIncomeEntries();

        return {
          statusCode: 200,
          message: 'Entry has been approved',
          data: updatedEntriesList,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while approving entry',
        data: error,
      };
    }
  }

  async declineEntry(dto: genericEditDto) {
    try {
      const entry: [] = await this.prismaService
        .$queryRaw`SELECT * FROM massageincome WHERE submission_id = ${dto.id}`;

      if (entry.length > 0) {
        await this.prismaService
          .$queryRaw`UPDATE massageincome SET status = rejected WHERE submission_id = ${dto.id}`;

        const updatedEntriesList = await this.getIncomeEntries();

        return {
          statusCode: 200,
          message: 'Entry has been rejected',
          data: updatedEntriesList,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while rejecting entry',
        data: error,
      };
    }
  }

  async deleteEntry(dto: genericFindDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE FROM massageincome WHERE submission_id = ${dto.id}`;

      const updatedEntriesList = await this.getIncomeEntries();

      return {
        statusCode: 200,
        message: 'Entry has been rejected',
        data: updatedEntriesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while rejecting entry',
        data: error,
      };
    }
  }

  //pos
  async saveSale(dto: saveSaleDto) {
    try {
      const insufficientItems = [];
      const cartItems = JSON.parse(dto.items);

      const promises = cartItems.map(
        async (item: { product_id: number; quantity: number }) => {
          const product = await this.prismaService
            .$queryRaw`SELECT quantity FROM eshopinventory WHERE product_id = ${item.product_id}`;
          const qtyInStock = product[0]?.quantity || 0;
          if (qtyInStock >= item.quantity) {
            return Promise.resolve();
          } else {
            insufficientItems.push(item.product_id);
            return Promise.reject();
          }
        },
      );

      try {
        await Promise.all(promises);
      } catch (error) {
        // If any item had insufficient stock, return here
        if (insufficientItems.length > 0) {
          return {
            statusCode: 400,
            message: 'Insufficient stock for some items',
            data: insufficientItems,
          };
        }
        throw error; // rethrow other errors
      }

      // If all items have sufficient stock, proceed to insert the sale
      await this.prismaService
        .$executeRaw`INSERT INTO eshopsales (client_id, items) VALUES (${dto.client_id}, ${dto.items})`;

      // Update the stock quantities
      const updatePromises = cartItems.map(
        async (item: { product_id: number; quantity: number }) => {
          await this.prismaService
            .$executeRaw`UPDATE eshopinventory SET quantity = quantity - ${item.quantity} WHERE product_id = ${item.product_id}`;
        },
      );

      // Wait for all stock updates to complete
      await Promise.all(updatePromises);

      return {
        statusCode: 200,
        message: 'Sale saved successfully',
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: 'Error while saving sale',
        data: error,
      };
    }
  }

  async retrieveSale(dto: genericFindDto) {
    try {
      const sale = await this.prismaService
        .$queryRaw`SELECT * FROM eshopsales WHERE sale_id = ${dto.id}`;

      return {
        statusCode: 200,
        message: 'Sale retrieved successfully',
        data: sale,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving sale',
        data: error,
      };
    }
  }

  async getAllSales() {
    try {
      const salesList: {
        sale_id: number;
        items: string;
        client_id: number;
        registeredAt: any;
      }[] = await this.prismaService.$queryRaw`SELECT * FROM eshopsales`;

      const sortedSalesList = salesList.sort((a, b) => {
        const dateA = new Date(a.registeredAt).setHours(0, 0, 0, 0);
        const dateB = new Date(b.registeredAt).setHours(0, 0, 0, 0);
        return dateB - dateA;
      });

      return {
        statusCode: 200,
        message: 'Sales list retrieved successfully',
        data: sortedSalesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while retrieving all sales',
        data: error,
      };
    }
  }

  async deleteSale(dto: genericFindDto) {
    try {
      const saleDetails = await this.prismaService
        .$queryRaw`SELECT items FROM eshopsales WHERE sale_id = ${dto.id}`;

      if (saleDetails[0].items) {
        const items = JSON.parse(saleDetails[0].items);

        const updatePromises = items.map(
          async (item: { product_id: number; quantity: number }) => {
            await this.prismaService
              .$executeRaw`UPDATE eshopinventory SET quantity = quantity + ${item.quantity} WHERE product_id = ${item.product_id}`;
          },
        );

        // Wait for all stock updates to complete
        await Promise.all(updatePromises);
      }
      await this.prismaService
        .$queryRaw`DELETE FROM eshopsales WHERE sale_id = ${dto.id}`;

      const updatedSalesList = await this.getAllSales();
      return {
        statusCode: 200,
        message: 'Sale deleted successfully',
        data: updatedSalesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting sale',
        data: error,
      };
    }
  }

  //generics
  async addProductCategory(dto: genericAddDto) {
    try {
      await this.prismaService
        .$executeRaw`INSERT INTO productcategories (name, description) VALUES (${dto.name}, ${dto.description})`;

      const updatedCategories = await this.getProductCategories();
      return {
        statusCode: 200,
        message: 'Product category added successfully',
        data: updatedCategories.data,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Error while adding product category',
        data: error,
      };
    }
  }

  async getProductCategories() {
    try {
      const categories = await this.prismaService
        .$queryRaw`SELECT * FROM productcategories`;
      return {
        statusCode: 200,
        message: 'Product categories retrieved successfully',
        data: categories,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching product categories',
        data: error,
      };
    }
  }
  async deleteProductCategory(dto: genericFindDto) {
    try {
      await this.prismaService
        .$executeRaw`DELETE FROM productcategories WHERE id = ${dto.id}`;
      const updatedCategories = await this.getProductCategories();
      return {
        statusCode: 200,
        message: 'Product category deleted successfully',
        data: updatedCategories.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting product category',
        data: error,
      };
    }
  }

  async addMUnit(dto: genericAddDto) {
    try {
      await this.prismaService
        .$executeRaw`INSERT INTO munits (name, description) VALUES (${dto.name}, ${dto.description})`;

      const units = await this.getUnits();
      return {
        statusCode: 200,
        message: 'Measurement unit added successfully',
        data: units.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while adding measurement unit',
        data: error,
      };
    }
  }

  async getUnits() {
    try {
      const units = await this.prismaService.$queryRaw`SELECT * FROM munits`;
      return {
        statusCode: 200,
        message: 'Measurement units retrieved successfully',
        data: units,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching measurement units',
        data: error,
      };
    }
  }

  async deleteMUnit(dto: genericFindDto) {
    try {
      await this.prismaService
        .$executeRaw`DELETE FROM munits WHERE unit_id = ${dto.id}`;
      const units = await this.getUnits();
      return {
        statusCode: 200,
        message: 'Measurement unit deleted successfully',
        data: units.data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting measurement units',
        data: error,
      };
    }
  }

  //reports
  async getDayPurchaseReport(dto: reportDto) {
    try {
      const purchasesList = await this.prismaService
        .$queryRaw`SELECT supplier_id, items, totalCost FROM supplyrecords JOIN supplier ON supplyrecords.suppier_id = supplier.supplier_id WHERE DATE(createdAt) = ${dto.date}`;
      return {
        statusCode: 200,
        message: `Purchase report for ${dto.date} retrieved successfully`,
        data: purchasesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error while fetching the purchase report for ${dto.date}`,
        data: error,
      };
    }
  }

  async getMonthPurchaseReport(dto: reportDto) {
    try {
      const purchasesList = await this.prismaService
        .$queryRaw`SELECT supplier_id, items, totalCost FROM supplyrecords JOIN supplier ON supplyrecords.suppier_id = supplier.supplier_id WHERE DATE_FORMAT(createdAt, '%Y-%m') = ${dto.date}`;
      return {
        statusCode: 200,
        message: `Purchase report for ${dto.date} retrieved successfully`,
        data: purchasesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error while fetching the purchase report for ${dto.date}`,
        data: error,
      };
    }
  }

  async getDayProductsSalesReport(dto: reportDto) {
    try {
      const salesList = await this.prismaService
        .$queryRaw`SELECT client_id, items, totalCost FROM eshopsales JOIN client ON eshopsales.client_id = client.client_id WHERE DATE(createdAt) = ${dto.date}`;
      return {
        statusCode: 200,
        message: `Product sales report for ${dto.date} retrieved successfully`,
        data: salesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error while fetching the product sales report for ${dto.date}`,
        data: error,
      };
    }
  }

  async getMonthProductsSalesReport(dto: reportDto) {
    try {
      const salesList = await this.prismaService
        .$queryRaw`SELECT client_id, items, totalCost FROM eshopsales JOIN client ON eshopsales.client_id = client.client_id WHERE DATE_FORMAT(createdAt, '%Y-%m') = ${dto.date}`;
      return {
        statusCode: 200,
        message: `Product sales report for ${dto.date} retrieved successfully`,
        data: salesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error while fetching the product sales report for ${dto.date}`,
        data: error,
      };
    }
  }

  async getDayProjectsSalesReport(dto: reportDto) {
    try {
      const salesList = await this.prismaService
        .$queryRaw`SELECT project_id, client_id, items, totalCost FROM projectsales JOIN client ON projectsales.client_id = client.client_id WHERE DATE(createdAt) = ${dto.date}`;
      return {
        statusCode: 200,
        message: `Project sales report for ${dto.date} retrieved successfully`,
        data: salesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error while fetching the project sales report for ${dto.date}`,
        data: error,
      };
    }
  }

  async getMonthProjectsSalesReport(dto: reportDto) {
    try {
      const salesList = await this.prismaService
        .$queryRaw`SELECT project_id, client_id, items, totalCost FROM projectsales JOIN client ON projectsales.client_id = client.client_id WHERE DATE_FORMAT(createdAt, '%Y-%m') = ${dto.date}`;
      return {
        statusCode: 200,
        message: `Project sales report for ${dto.date} retrieved successfully`,
        data: salesList,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error while fetching the project sales report for ${dto.date}`,
        data: error,
      };
    }
  }

  //saffron
  async saveSaffronSale(dto: saveSaffronSaleDto) {
    try {
      const points = parseFloat(dto.amount_sold) / 2;
      const user = await this.prismaService
        .$queryRaw`SELECT totalpts FROM saffronuser WHERE user_id = ${dto.user_id}`;

      if (user[0].totalpts) {
        const newPoints = user[0].totalpts + points;
        await this.prismaService
          .$executeRaw`UPDATE saffronuser SET totalpts = ${newPoints} WHERE user_id = ${dto.user_id}`;
      }
      await this.prismaService
        .$executeRaw`INSERT INTO saffronsale (user_id, amount_sold, points) VALUES (${dto.user_id}, ${dto.amount_sold}, ${points})`;

      const getAllSaffronSales = await this.getSaffronSales();

      return {
        statusCode: 200,
        message: 'All saffron sales retrieved successfully',
        data: getAllSaffronSales,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while saving saffron sale',
        data: error,
      };
    }
  }

  async getSaffronSales() {
    try {
      const sales = await this.prismaService
        .$queryRaw`SELECT saffronsale.user_id, saffronsale.amount_sold, saffronsale.createdAt FROM saffronsale JOIN saffronuser ON saffronsale.user_id = saffronuser.user_id`;

      return {
        statusCode: 200,
        message: 'All saffron sales retrieved successfully',
        data: sales,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching saffron sales',
        data: error,
      };
    }
  }

  async deleteSaffronSale(dto: deleteSaffronSaleDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE FROM saffronsale WHERE sale_id = ${dto.id}`;

      const user = await this.prismaService
        .$queryRaw`SELECT totalpts FROM saffronuser WHERE user_id = ${dto.user_id}`;

      if (user[0].totalpts) {
        const newPoints = user[0].totalpts - dto.points;
        await this.prismaService
          .$executeRaw`UPDATE saffronuser SET totalpts = ${newPoints} WHERE user_id = ${dto.user_id}`;
      }

      const updatedSales = await this.getSaffronSales();
      return {
        statusCode: 200,
        message: 'Saffron sale has been deleted successfully',
        data: updatedSales,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while deleting saffron sale',
        data: error,
      };
    }
  }

  async getSaffronStandings() {
    try {
      const currentPts: { username: string; totalpts: number }[] = await this
        .prismaService.$queryRaw`SELECT username, totalpts FROM saffronuser`;

      const standings = currentPts.sort((a, b) => {
        const usrA = a.totalpts;
        const usrB = b.totalpts;
        return usrA - usrB;
      });

      return {
        statusCode: 200,
        message: 'Saffron standings retrieved successfully',
        data: standings,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while getting standings',
        data: error,
      };
    }
  }
}
