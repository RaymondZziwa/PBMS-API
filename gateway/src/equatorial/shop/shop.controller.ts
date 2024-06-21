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

@Controller('api/equatorial/')
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
    return this.natsClient.send({ cmd: 'GEDIT_PROJECT' }, req.body);
  }

  @Post('/edit-product')
  editProduct(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_PRODUCT' }, req.body);
  }

  @Get('/get-product-stock')
  getProductStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PRODUCT_STOCK' }, req.body);
  }

  @Get('/get-project-stock')
  getProjectStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PROJECT_STOCK' }, req.body);
  }

  @Get('/product-restock-records')
  getProductRestockRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_PRODUCT_RESTOCK_RECORDS' },
      req.body,
    );
  }

  @Get('/product-deplete-records')
  getProductDepleteRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_PRODUCT_DEPLETION_RECORDS' },
      req.body,
    );
  }

  @Get('/project-restock-records')
  getProjectRestockRecords(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_PROJECT_RESTOCK_RECORDS' },
      req.body,
    );
  }

  @Get('/get-project-deplete-records')
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

  @Get('/product-stock')
  productStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PRODUCT_STOCK' }, req.body);
  }

  @Get('/project-stock')
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

  @Get('/get-expense')
  getExpense(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_EXPENSE' }, req.body);
  }

  @Post('/edit-expense')
  editExpense(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'EDIT_EXPENSE' }, req.body);
  }

  @Get('/all-expenses')
  getAllExpenses(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_EXPENSES' }, req.body);
  }
  // @Get('/get-item-inventory-records')
  // getItemInventoryRecords(@Req() req: Request) {
  //   return this.natsClient.send(
  //     { cmd: 'GET_ITEM_INVENTORY_RECORDS' },
  //     req.body,
  //   );
  // }

  // @Post('/issue-external-receipt')
  // issueExternalReceipt(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'ISSUE_EXTERNAL_RECEIPT' }, req.body);
  // }

  // @Get('/get-external-receipts')
  // getExternalReceipts(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_EXTERNAL_RECEIPTS' }, req.body);
  // }

  // @Post('/approve-external-receipt')
  // approveExternalReceipt(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'APPROVE_EXTERNAL_RECEIPTS' }, req.body);
  // }

  // @Post('/decline-external-receipt')
  // declineExternalReceipt(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'DECLINE_EXTERNAL_RECEIPTS' }, req.body);
  // }

  // @Post('/saffron/save-sale')
  // saveSaffronSale(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'SAFFRON_SAVE_SALE' }, req.body);
  // }

  // @Get('/saffron/daily-analysis')
  // saffronDailyCompetitionAnalysis(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'SAFFRON_DAILY ANALYSIS' }, req.body);
  // }

  // @Get('/saffron/weekly-analysis')
  // saffronWeeklyCompetitionAnalysis(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'SAFFRON_WEEKLY_ANALYSIS' }, req.body);
  // }

  // @Get('/saffron/monthly-analysis')
  // saffronMonthlyCompetitionAnalysis(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'SAFFRON_MONTHLY_ANALYSIS' }, req.body);
  // }

  // @Get('/get-sale-data')
  // getSaleData(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_SALE_DATA' }, req.body);
  // }

  // @Get('/massage-income')
  // getMassageIncomeSubmission(@Req() req: Request) {
  //   return this.natsClient.send(
  //     { cmd: 'GET_MASSAGE_INCOME_SUBMISSION' },
  //     req.body,
  //   );
  // }

  // @Post('/approve-income-submission')
  // approveMassageIncomeSubmission(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'APPROVE_MASSAGE_INCOME' }, req.body);
  // }

  // @Post('/reject-income-submission')
  // rejectMassageIncomeSubmission(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'REJECT_MASSAGE_INCOME' }, req.body);
  // }

  // @Get('/fetch-client-purchases')
  // fetchClientSales(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'FETCH_CLIENT_PURCHASES' }, req.body);
  // }

  // @Post('/record-shop-expenses')
  // recordShopExpense(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'RECORD_SHOP_EXPENSES' }, req.body);
  // }

  // @Get('/get-all-expenses')
  // getAllExpenses(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_ALL_EXPENSES' }, req.body);
  // }

  // @Post('/view-expense-details')
  // viewShopExpenseDetails(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'VIEW_EXPENSE_DETAILS' }, req.body);
  // }

  // @Post('record-cheque-details')
  // recordChequeDetails(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'RECORD_CHEQUE_DETAILS' }, req.body);
  // }

  // @Get('/get-all-cheques')
  // getAllCheques() {
  //   return this.natsClient.send({ cmd: 'GET_ALL_CHEQUES' }, '');
  // }

  // @Get('/get-cheque-details')
  // getChequeDetails(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_CHEQUE_DETAILS' }, req.body);
  // }

  // @Post('/change-cheque-status')
  // changeChequeStatus(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'CHANGE_CHEQUE_STATUS' }, req.body);
  // }

  // @Post('/save-new-customer-details')
  // saveNewCustomerDetails(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'SAVE_NEW_CUSTOMER_DETAILS' }, req.body);
  // }

  // @Get('/get-all-customers')
  // getAllCustomerDetails() {
  //   return this.natsClient.send({ cmd: 'GET_ALL_CUSTOMERS' }, '');
  // }

  // @Get('/get-customer-details')
  // getCustomerDetails(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_CUSTOMER_DETAILS' }, req.body);
  // }

  // @Get('/get-sales-records')
  // getSalesRecords(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_ALL_SALES' }, req.body);
  // }

  // @Get('/get-reports')
  // getReports(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_REPORTS' }, req.body);
  // }

  // @Get('/get-daily-report')
  // getDailyReport(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_DAILY_REPORT' }, req.body);
  // }

  // @Get('/get-weekly-report')
  // getWeeklyReport(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_WEEKLY_REPORT' }, req.body);
  // }

  // @Get('/get-monthly-report')
  // getMonthlyReport(@Req() req: Request) {
  //   return this.natsClient.send({ cmd: 'GET_MONTHLY_REPORT' }, req.body);
  // }
}
