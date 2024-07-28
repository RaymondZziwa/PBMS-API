import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  deleteSaffronSaleDto,
  editClientDto,
  editSupplierDto,
  genericAddDto,
  genericEditDto,
  genericFindDto,
  getBranchDataDto,
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
  getInventoryStock(data: getBranchDataDto) {
    return this.appService.getShopStock(data);
  }

  @MessagePattern({ cmd: 'GET_PROJECT_STOCK' })
  getProjectStock(data: getBranchDataDto) {
    return this.appService.getProjectStock(data);
  }

  @MessagePattern({ cmd: 'GET_PRODUCT_RESTOCK_RECORDS' })
  getInventoryStockRestockRecords(data: getBranchDataDto) {
    return this.appService.getProductRestockRecords(data);
  }

  @MessagePattern({ cmd: 'GET_PROJECT_RESTOCK_RECORDS' })
  getProjectRestockRecords() {
    return this.appService.getProjectRestockRecords;
  }

  @MessagePattern({ cmd: 'GET_PRODUCT_DEPLETION_RECORDS' })
  getInventoryStockDepletionRecords(data: getBranchDataDto) {
    return this.appService.getProductDepleteRecords(data);
  }

  @MessagePattern({ cmd: 'GET_PROJECT_DEPLETION_RECORDS' })
  getProjectDepletionRecords(data: getBranchDataDto) {
    return this.appService.getProjectDepleteRecords(data);
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
  async getAllExpenses(data: getBranchDataDto) {
    return this.appService.getAllExpenses(data);
  }

  @MessagePattern({ cmd: 'DELETE_EXPENSE' })
  async deleteExpense(@Payload() data: genericFindDto) {
    return this.appService.deleteExpense(data);
  }

  //saffron
  @MessagePattern({ cmd: 'SAVE_SAFFRON_SALE' })
  async saveSaffronSale(@Payload() data: saveSaffronSaleDto) {
    return this.appService.saveSaffronSale(data);
  }

  @MessagePattern({ cmd: 'DELETE_SAFFRON_SALE' })
  async deleteSaffronSale(@Payload() data: deleteSaffronSaleDto) {
    return this.appService.deleteSaffronSale(data);
  }

  @MessagePattern({ cmd: 'GET_SAFFRON_SALES' })
  async getSaffronSales() {
    return this.appService.getSaffronSales();
  }

  @MessagePattern({ cmd: 'GET_SAFFRON_STANDINGS' })
  async getSaffronStandings() {
    return this.appService.getSaffronStandings();
  }

  //client
  @MessagePattern({ cmd: 'SAVE_NEW_CLIENT' })
  async saveClient(@Payload() data: saveClientDto) {
    return this.appService.saveNewClient(data);
  }

  @MessagePattern({ cmd: 'DELETE_CLIENT' })
  async deleteClient(@Payload() data: genericFindDto) {
    return this.appService.deleteClient(data);
  }

  @MessagePattern({ cmd: 'EDIT_CLIENT' })
  async editClient(@Payload() data: editClientDto) {
    return this.appService.editClient(data);
  }

  @MessagePattern({ cmd: 'GET_CLIENT_PURCHASES' })
  async getClientPurchases(@Payload() data: genericFindDto) {
    return this.appService.getClientPurchasesList(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_CLIENTS' })
  async getAllClients() {
    return this.appService.getAllClients();
  }

  @MessagePattern({ cmd: 'GET_CLIENT' })
  async getClient(@Payload() data: genericFindDto) {
    return this.appService.getClient(data);
  }

  //supplier
  @MessagePattern({ cmd: 'SAVE_NEW_SUPPLIER' })
  async saveSupplier(@Payload() data: saveSupplierDto) {
    return this.appService.saveNewSupplier(data);
  }

  @MessagePattern({ cmd: 'DELETE_SUPPLIER' })
  async deleteSupplier(@Payload() data: genericFindDto) {
    return this.appService.deleteSupplier(data);
  }

  @MessagePattern({ cmd: 'EDIT_SUPPLIER' })
  async editSupplier(@Payload() data: editSupplierDto) {
    return this.appService.editSupplier(data);
  }

  @MessagePattern({ cmd: 'GET_SUPPLIER_SUPPLIES' })
  async getSupplierSupplies(@Payload() data: genericFindDto) {
    return this.appService.getSupplierSuppliesList(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_SUPPLIERS' })
  async getAllSuppliers() {
    return this.appService.getAllSuppliers();
  }

  @MessagePattern({ cmd: 'GET_SUPPLIER' })
  async getSupplier(@Payload() data: genericFindDto) {
    return this.appService.getSupplier(data);
  }

  //massage
  @MessagePattern({ cmd: 'GET_INCOME_ENTRIES' })
  async getIncomeEntries() {
    return this.appService.getIncomeEntries();
  }

  @MessagePattern({ cmd: 'APPROVE_ENTRY' })
  async approveEntry(@Payload() data: genericEditDto) {
    return this.appService.approveEntry(data);
  }

  @MessagePattern({ cmd: 'DECLINE_ENTRY' })
  async declineEntry(@Payload() data: genericEditDto) {
    return this.appService.declineEntry(data);
  }

  @MessagePattern({ cmd: 'DELETE_ENTRY' })
  async deleteEntry(@Payload() data: genericFindDto) {
    return this.appService.deleteEntry(data);
  }

  //pos
  @MessagePattern({ cmd: 'SAVE_SALE' })
  async saveSale(@Payload() data: saveSaleDto) {
    return this.appService.saveSale(data);
  }

  @MessagePattern({ cmd: 'RETRIEVE_SALE' })
  async retrieveSale(@Payload() data: genericFindDto) {
    return this.appService.retrieveSale(data);
  }

  @MessagePattern({ cmd: 'DELETE_SALE' })
  async deleteSale(@Payload() data: genericFindDto) {
    return this.appService.deleteSale(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_SALES' })
  async getAllSales(data: getBranchDataDto) {
    return this.appService.getAllSales(data);
  }

  //generics
  @MessagePattern({ cmd: 'SAVE_PRODUCT_CATEGORY' })
  async saveProductCategory(@Payload() data: genericAddDto) {
    return this.appService.addProductCategory(data);
  }

  @MessagePattern({ cmd: 'DELETE_PRODUCT_CATEGORY' })
  async deleteProductCategory(@Payload() data: genericFindDto) {
    return this.appService.deleteProductCategory(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_PRODUCT_CATEGORIES' })
  async getAllProductCategories() {
    return this.appService.getProductCategories();
  }

  @MessagePattern({ cmd: 'SAVE_MUNIT' })
  async saveMUnit(@Payload() data: genericAddDto) {
    return this.appService.addMUnit(data);
  }

  @MessagePattern({ cmd: 'DELETE_MUNIT' })
  async deleteMUnit(@Payload() data: genericFindDto) {
    return this.appService.deleteMUnit(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_MUNITS' })
  async getAllMUnits() {
    return this.appService.getUnits();
  }
  //reports
  @MessagePattern({ cmd: 'GET_DAY_PURCHASE_REPORT' })
  async getDayPurchaseReport(@Payload() data: reportDto) {
    return this.appService.getDayPurchaseReport(data);
  }

  @MessagePattern({ cmd: 'GET_MONTH_PURCHASE_REPORT' })
  async getMonthPurchaseReport(@Payload() data: reportDto) {
    return this.appService.getMonthPurchaseReport(data);
  }

  @MessagePattern({ cmd: 'GET_DAY_PRODUCT_SALES_REPORT' })
  async getDayProductsSalesReport(@Payload() data: reportDto) {
    return this.appService.getDayProductsSalesReport(data);
  }

  @MessagePattern({ cmd: 'GET_MONTH_PRODUCT_SALES_REPORT' })
  async getMonthProductsSalesReport(@Payload() data: reportDto) {
    return this.appService.getMonthProductsSalesReport(data);
  }

  @MessagePattern({ cmd: 'GET_DAY_PROJECTS_SALES_REPORT' })
  async getDayProjectSalesReport(@Payload() data: reportDto) {
    return this.appService.getDayProjectsSalesReport(data);
  }

  @MessagePattern({ cmd: 'GET_MONTH_PROJECTS_SALES_REPORT' })
  async getMonthProjectSalesReport(@Payload() data: reportDto) {
    return this.appService.getMonthProjectsSalesReport(data);
  }
}
