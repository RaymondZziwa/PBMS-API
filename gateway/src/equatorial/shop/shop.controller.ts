import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BearerTokenExtractor } from 'src/middleware/tokenExtractor.middleware';

@Controller('api/v1/')
@UseInterceptors(BearerTokenExtractor)
export class equatorialShopController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post('/register-product')
  registerProduct(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'REGISTER_PRODUCT' }, req.body);
  }

  @Post('/register-project')
  registerProject(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'REGISTER_PROJECT' }, req.body);
  }

  @Get('/get-all-products')
  getAllProducts(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_PRODUCTS' }, req.body);
  }

  @Get('/get-all-projects')
  getAllProjects(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_PROJECTS' }, req.body);
  }

  @Get('/get-product')
  getProduct(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PRODUCT' }, req.body);
  }

  @Get('/get-project')
  getProjects(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PROJECT' }, req.body);
  }

  @Post('/edit-project')
  editProject(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_PROJECT' }, req.body);
  }

  @Post('/edit-product')
  editProduct(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_PRODUCT' }, req.body);
  }

  @Post('/get-product-stock')
  getProductStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PRODUCT_STOCK' }, req.body);
  }

  @Post('/get-project-stock')
  getProjectStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PROJECT_STOCK' }, req.body);
  }

  @Post('/product-restock-records')
  getProductRestockRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_PRODUCT_RESTOCK_RECORDS' },
      req.body,
    );
  }

  @Post('/product-deplete-records')
  getProductDepleteRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_PRODUCT_DEPLETION_RECORDS' },
      req.body,
    );
  }

  @Post('/project-restock-records')
  getProjectRestockRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_PROJECT_RESTOCK_RECORDS' },
      req.body,
    );
  }

  @Post('/get-project-deplete-records')
  getProjectDepleteRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_PROJECT_DEPLETION_RECORDS' },
      req.body,
    );
  }

  @Post('/restock-product')
  productrestock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RESTOCK_PRODUCT' }, req.body);
  }

  @Post('/deplete-product')
  productdepletion(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DEPLETION_PRODUCT' }, req.body);
  }

  @Post('/restock-project')
  projectrestock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RESTOCK_PROJECT' }, req.body);
  }

  @Post('/deplete-project')
  projectdepletion(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DEPLETION_PROJECT' }, req.body);
  }

  @Post('/product-stock')
  productStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PRODUCT_STOCK' }, req.body);
  }

  @Post('/project-stock')
  projectStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PROJECT_STOCK' }, req.body);
  }

  @Post('/delete-project')
  deleteProject(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_PROJECT' }, req.body);
  }

  @Post('/delete-product')
  deleteProduct(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_PRODUCT' }, req.body);
  }

  //Expenses
  @Post('/save-expense')
  saveExpense(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_EXPENSE' }, req.body);
  }

  @Post('/delete-expense')
  deleteExpense(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_EXPENSE' }, req.body);
  }

  @Post('/get-expense')
  getExpense(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_EXPENSE' }, req.body);
  }

  @Post('/edit-expense')
  editExpense(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_EXPENSE' }, req.body);
  }

  @Post('/get-all-expenses')
  getAllExpenses(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_EXPENSES' }, req.body);
  }

  //reports
  @Post('/get-day-purchase-report')
  getDayPurchaseReport(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_DAY_PURCHASE_REPORT' }, req.body);
  }

  @Post('/get-month-purchase-report')
  getMonthPurchaseReport(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_MONTH_PURCHASE_REPORT' }, req.body);
  }

  @Post('/get-day-products-sales-report')
  getDayProductsSalesReport(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_DAY_PRODUCT_SALES_REPORT' },
      req.body,
    );
  }

  @Post('/get-month-products-sales-report')
  getMonthProductsSalesReport(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_MONTH_PRODUCT_SALES_REPORT' },
      req.body,
    );
  }

  @Post('/get-day-projects-sales-report')
  getDayProjectsSalesReport(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_DAY_PROJECTS_SALES_REPORT' },
      req.body,
    );
  }

  @Post('/get-month-projects-sales-report')
  getMonthProjectsSalesReport(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_MONTH_PROJECTS_SALES_REPORT' },
      req.body,
    );
  }

  //generics
  @Post('/save-product-category')
  saveProductCategory(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_PRODUCT_CATEGORY' }, req.body);
  }

  @Post('/save-munit')
  saveMUnit(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_MUNIT' }, req.body);
  }

  @Post('/delete-product-category')
  deleteProductCategory(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_PRODUCT_CATEGORY' }, req.body);
  }

  @Post('/delete-munit')
  deleteMUnit(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_MUNIT' }, req.body);
  }

  @Get('/get-all-product-categories')
  getAllProductCategories(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_ALL_PRODUCT_CATEGORIES' },
      req.body,
    );
  }

  @Get('/get-all-munits')
  getAllMUnits(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_MUNITS' }, req.body);
  }

  //pos
  @Post('/save-sale')
  saveSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_SALE' }, req.body);
  }

  @Post('/save-projects-sale')
  saveProjectsSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_PROJECTS_SALE' }, req.body);
  }

  @Post('/delete-esale')
  deleteSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_SALE' }, req.body);
  }

  @Get('/get-esale')
  retrieveSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RETRIEVE_SALE' }, req.body);
  }

  @Post('/get-all-products-sales')
  getAllSales(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_PRODUCTS_SALES' }, req.body);
  }

  @Post('/get-all-projects-sales')
  getAllProjectsSales(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_PROJECTS_SALES' }, req.body);
  }

  //massage
  @Post('/restock-massage-store')
  restockMassageStore(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RESTOCK_GENERAL_STORE' }, req.body);
  }

  @Post('/deplete-massage-store')
  depleteMassageStore(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RELEASE_INVENTORY' }, req.body);
  }

  @Post('/get-massage-restock-records')
  getMassageRestockRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_GENERAL_STORE_RESTOCK_RECORDS' },
      req.body,
    );
  }

  @Post('/get-massage-deplete-records')
  getMassageDepleteRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_GENERAL_STORE_STOCK_RELEASE_RECORDS' },
      req.body,
    );
  }

  @Post('/save-sale')
  saveMassageSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_MASSAGE_SALE' }, req.body);
  }

  @Post('/submit-income')
  saveIncomeSubmission(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'SAVE_MASSAGE_INCOME_SUBMISSION' },
      req.body,
    );
  }

  @Post('/get-massage-reports')
  getMassageReports(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_MASSAGE_REPORTS' }, req.body);
  }

  @Post('/get-massage-sale-records')
  getMassageSaleRecords(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_MASSAGE_SALE_RECORDS' }, req.body);
  }

  @Post('/decline-income-entry')
  declineEntry(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DECLINE_ENTRY' }, req.body);
  }

  @Post('/approve-income-entry')
  approveEntry(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'APPROVE_ENTRY' }, req.body);
  }

  @Post('/delete-income-entry')
  deleteEntry(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_ENTRY' }, req.body);
  }

  @Get('/massage-income-entries')
  getAllIncomeEntries(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_INCOME_ENTRIES' }, req.body);
  }

  //supplier
  @Post('/save-supplier')
  saveSupplier(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_NEW_SUPPLIER' }, req.body);
  }

  @Post('/delete-supplier')
  deleteSupplier(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_SUPPLIER' }, req.body);
  }

  @Post('/edit-supplier')
  editSupplier(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_SUPPLIER' }, req.body);
  }

  @Get('/get-supplier')
  getSupplier(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_SUPPLIER' }, req.body);
  }

  @Post('/get-supplier-supplies')
  getSupplierSupplies(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_SUPPLIER_SUPPLIES' }, req.body);
  }

  @Get('/get-all-suppliers')
  getAllSuppliers(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_SUPPLIERS' }, req.body);
  }

  //client
  @Post('/save-client')
  saveClient(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_NEW_CLIENT' }, req.body);
  }

  @Post('/delete-client')
  deleteClient(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_CLIENT' }, req.body);
  }

  @Post('/edit-client')
  editClient(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_CLIENT' }, req.body);
  }

  @Get('/get-client')
  getClient(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_CLIENT' }, req.body);
  }

  @Get('/get-client-purchases')
  getClientPurchases(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_CLIENT_PURCHASES' }, req.body);
  }

  @Get('/get-all-clients')
  getAllClients(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_CLIENTS' }, req.body);
  }

  //saffron
  //--save saffron user, edit and delete
  @Post('/save-saffron-sale')
  saveSaffronSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_SAFFRON_SALE' }, req.body);
  }

  @Post('/delete-saffron-sale')
  deleteSaffronSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_SAFFRON_SALE' }, req.body);
  }

  @Get('/get-saffron-sales')
  getSaffronSales(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_SAFFRON_SALES' }, req.body);
  }

  @Get('/get-saffron-standings')
  getSaffronStandings(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_SAFFRON_STANDINGS' }, req.body);
  }

  //general store
  @Post('/restock-general-store')
  restockGS(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RESTOCK_GENERAL_STORE' }, req.body);
  }

  @Post('/deplete-general-store')
  releaseGSInventory(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RELEASE_INVENTORY' }, req.body);
  }

  @Post('/general-store-restock-records')
  getGSRestockRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_GENERAL_STORE_RESTOCK_RECORDS' },
      req.body,
    );
  }

  @Post('/general-store-deplete-records')
  getGSReleaseRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_GENERAL_STORE_STOCK_RELEASE_RECORDS' },
      req.body,
    );
  }

  @Post('/general-store-stock-taking')
  getGSStockLevels(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_GENERAL_STORE_STOCK_LEVELS' },
      req.body,
    );
  }
}
