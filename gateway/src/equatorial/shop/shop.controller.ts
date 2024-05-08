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

@Controller('api/equatorial/shop')
@UseInterceptors(BearerTokenExtractor)
export class equatorialShopController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post('/register-product')
  registerProduct(@Req() req: Request) {
    //const token = req['token'];
    // const isValid$ = this.natsClient.send<boolean>(
    //   { cmd: 'VALIDATE_TOKEN' },
    //   token,
    // );
    return this.natsClient.send({ cmd: 'REGISTER_PRODUCT' }, req.body);
  }

  @Get('/get-products')
  getProducts(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_PRODUCTS' }, req.body);
  }

  @Post('/restock-inventory')
  restock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'RESTOCK_INVENTORY' }, req.body);
  }

  @Post('/takeout-stock')
  takeOutStock(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'TAKEOUT_STOCK' }, req.body);
  }

  @Get('/stock-taking')
  stockTaking(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'STOCK_TAKING' }, req.body);
  }

  @Get('/get-inventory-records')
  getInventoryRecords(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_INVENTORY_RECORDS' }, req.body);
  }

  @Post('/issue-external-receipt')
  issueExternalReceipt(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'ISSUE_EXTERNAL_RECEIPT' }, req.body);
  }

  @Get('/get-external-receipts')
  getExternalReceipts(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_EXTERNAL_RECEIPTS' }, req.body);
  }

  @Post('/approve-external-receipt')
  approveExternalReceipt(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'APPROVE_EXTERNAL_RECEIPTS' }, req.body);
  }

  @Post('/decline-external-receipt')
  declineExternalReceipt(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DECLINE_EXTERNAL_RECEIPTS' }, req.body);
  }

  @Post('/saffron/save-sale')
  saveSaffronSale(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAFFRON_SAVE_SALE' }, req.body);
  }

  @Get('/saffron/daily-analysis')
  saffronDailyCompetitionAnalysis(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAFFRON_DAILY ANALYSIS' }, req.body);
  }

  @Get('/saffron/weekly-analysis')
  saffronWeeklyCompetitionAnalysis(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAFFRON_WEEKLY_ANALYSIS' }, req.body);
  }

  @Get('/saffron/monthly-analysis')
  saffronMonthlyCompetitionAnalysis(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAFFRON_MONTHLY_ANALYSIS' }, req.body);
  }

  @Get('/get-sale-data')
  getSaleData(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_SALE_DATA' }, req.body);
  }

  @Get('/massage-income')
  getMassageIncomeSubmission(@Req() req: Request) {
    return this.natsClient.send(
      { cmd: 'GET_MASSAGE_INCOME_SUBMISSION' },
      req.body,
    );
  }

  @Post('/approve-income-submission')
  approveMassageIncomeSubmission(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'APPROVE_MASSAGE_INCOME' }, req.body);
  }

  @Post('/reject-income-submission')
  rejectMassageIncomeSubmission() {}

  @Post('/fetch-client-sales')
  fetchClientSales() {}

  @Post('/record-shop-expenses')
  recordShopExpense() {}

  @Get('/get-all-expenses')
  getAllExpenses() {}

  @Post('/view-expense-details')
  viewShopExpenseDetails() {}

  @Post('record-cheque-details')
  recordChequeDetails() {}

  @Get('/get-all-cheques')
  getAllCheques() {}

  @Get('/get-cheque-details')
  getChequeDetails() {}

  @Post('/change-cheque-status')
  changeChequeStatus() {}

  @Post('/save-new-customer-details')
  saveNewCustomerDetails() {}

  @Get('/get-all-customers')
  getAllCustomerDetails() {}

  @Get('/get-customer-details')
  getCustomerDetails() {}

  @Get('/get-sales-records')
  getSalesRecords() {}

  @Get('/get-reports')
  getReports() {}

  @Get('/get-daily-report')
  getDailyReport() {}

  @Get('/get-weekly-report')
  getWeeklyReport() {}

  @Get('/get-monthly-report')
  getMonthlyReport() {}
}
