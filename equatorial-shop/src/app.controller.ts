import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  genericEditDto,
  genericFindDto,
  registerProductDto,
  registerProjectDto,
  saveExpenseDto,
  saveProductInventoryDepleteDto,
  saveProductInventoryRestockDto,
  saveProjectInventoryDepleteDto,
  saveProjectInventoryRestockDto,
  updateExpenseDto,
  viewExpenseDto,
} from './dto/equatorial_shop.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'REGISTER_PRODUCT' })
  registerProduct(@Payload() data: registerProductDto) {
    return this.appService.registerProduct(data);
  }

  @MessagePattern({ cmd: 'REGISTER_PROJECT' })
  registerProject(@Payload() data: registerProjectDto) {
    return this.appService.registerProject(data);
  }

  @MessagePattern({ cmd: 'GET_PRODUCT' })
  getProduct(@Payload() data: number) {
    return this.appService.getProduct(data);
  }

  @MessagePattern({ cmd: 'GET_PROJECT' })
  getProject(@Payload() data: genericFindDto) {
    return this.appService.getProject(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_PRODUCTS' })
  getAllProducts() {
    return this.appService.getAllProducts();
  }

  @MessagePattern({ cmd: 'GET_ALL_PROJECTS' })
  getAllProjects() {
    return this.appService.getAllProjects();
  }

  @MessagePattern({ cmd: 'EDIT_PRODUCT' })
  editProduct(@Payload() data: genericEditDto) {
    return this.appService.editProduct(data);
  }

  @MessagePattern({ cmd: 'EDIT_PROJECT' })
  editProject(@Payload() data: genericEditDto) {
    return this.appService.editProject(data);
  }

  @MessagePattern({ cmd: 'GET_PRODUCT_STOCK' })
  getInventoryStock() {
    return this.appService.getEquatorialShopStock();
  }

  @MessagePattern({ cmd: 'GET_PROJECT_STOCK' })
  getProjectStock() {
    return this.appService.getEquatorialProjectStock();
  }

  @MessagePattern({ cmd: 'GET_PRODUCT_RESTOCK_RECORDS' })
  getInventoryStockRestockRecords() {
    return this.appService.getProductRestockRecords();
  }

  @MessagePattern({ cmd: 'GET_PROJECT_RESTOCK_RECORDS' })
  getProjectRestockRecords() {
    return this.appService.getProjectRestockRecords;
  }

  @MessagePattern({ cmd: 'GET_PRODUCT_DEPLETION_RECORDS' })
  getInventoryStockDepletionRecords() {
    return this.appService.getProductDepleteRecords();
  }

  @MessagePattern({ cmd: 'GET_PROJECT_DEPLETION_RECORDS' })
  getProjectDepletionRecords() {
    return this.appService.getProjectDepleteRecords();
  }

  @MessagePattern({ cmd: 'RESTOCK_PRODUCT' })
  restockProduct(@Payload() data: saveProductInventoryRestockDto) {
    return this.appService.shopRestock(data);
  }

  @MessagePattern({ cmd: 'RESTOCK_PROJECT' })
  restockProject(@Payload() data: saveProjectInventoryRestockDto) {
    return this.appService.projectsRestock(data);
  }

  @MessagePattern({ cmd: 'DEPLETION_PRODUCT' })
  depleteProduct(@Payload() data: saveProductInventoryDepleteDto) {
    return this.appService.depleteStock(data);
  }

  @MessagePattern({ cmd: 'DEPLETION_PROJECT' })
  depleteProject(@Payload() data: saveProjectInventoryDepleteDto) {
    return this.appService.depleteProjects(data);
  }

  @MessagePattern({ cmd: 'DELETE_PRODUCT' })
  async deleteProduct(@Payload() data: genericFindDto) {
    return this.appService.deleteProduct(data);
  }

  @MessagePattern({ cmd: 'DELETE_PRODUCT_RESTOCK_RECORD' })
  async deleteProductRestockRecord(@Payload() data: genericFindDto) {
    return this.appService.deleteProductRestockRecord(data);
  }

  @MessagePattern({ cmd: 'DELETE_PRODUCT_DEPLETION_RECORD' })
  async deleteProductDepleteRecord(@Payload() data: genericFindDto) {
    return this.appService.deleteProductDepletionRecord(data);
  }

  @MessagePattern({ cmd: 'DELETE_PROJECT' })
  async deleteProject(@Payload() data: genericFindDto) {
    return this.appService.deleteProject(data);
  }

  @MessagePattern({ cmd: 'DELETE_PROJECT_RESTOCK_RECORD' })
  async deleteProjectRestockRecord(@Payload() data: genericFindDto) {
    return this.appService.deleteProjectRestockRecord(data);
  }

  @MessagePattern({ cmd: 'DELETE_PROJECT_DEPLETION_RECORD' })
  async deleteProjectDepleteRecord(@Payload() data: genericFindDto) {
    return this.appService.deleteProjectDepletionRecord(data);
  }

  /*Manage Expenses */
  @MessagePattern({ cmd: 'SAVE_EXPENSE' })
  async saveExpense(dto: saveExpenseDto) {
    return this.appService.saveExpense(dto);
  }

  @MessagePattern({ cmd: 'GET_EXPENSE' })
  async getExpense(@Payload() data: viewExpenseDto) {
    return this.appService.getExpense(data);
  }

  @MessagePattern({ cmd: 'EDIT_EXPENSE' })
  async editExpense(@Payload() data: updateExpenseDto) {
    return this.appService.editExpense(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_EXPENSES' })
  async getAllExpenses() {
    return this.appService.getAllExpenses();
  }

  @MessagePattern({ cmd: 'DELETE_EXPENSE' })
  async deleteExpense(@Payload() data: genericFindDto) {
    return this.appService.deleteExpense(data);
  }
}
