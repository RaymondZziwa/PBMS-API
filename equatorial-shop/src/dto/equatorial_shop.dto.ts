import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class inventoryTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  units: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsString()
  @IsNotEmpty()
  authorized_by: string;

  @IsDateString()
  @IsNotEmpty()
  transaction_date: Date;
}

export class itemInventoryRecordsDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  period?: string;
}

export class externalReceiptDto {
  @IsString()
  @IsNotEmpty()
  receipt_number: string;

  @IsNumber()
  @IsNotEmpty()
  client_id: number;

  @IsString()
  @IsNotEmpty()
  items: string;

  @IsString()
  @IsNotEmpty()
  total_price: string;

  @IsString()
  @IsNotEmpty()
  balance: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsString()
  @IsNotEmpty()
  payment_status: string;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsString()
  @IsNotEmpty()
  transaction_id: string;

  @IsDateString()
  @IsNotEmpty()
  sale_date: string;
}

export class changeExternalReceiptStatusDto {
  @IsString()
  @IsNotEmpty()
  receipt_number: string;

  @IsString()
  notes?: string;

  @IsString()
  @IsNotEmpty()
  newStatus: string;
}

export class saveSaffronSaleDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  amount_sold: string;

  @IsDateString()
  @IsNotEmpty()
  sale_date: Date;

  @IsString()
  @IsNotEmpty()
  points: string;
}

export class saffronSalesAnalysis {
  @IsDateString()
  day?: Date;

  @IsString()
  week_number?: string;

  @IsString()
  month?: string;
}

export class saveMassageIncomeDto {
  @IsDateString()
  @IsNotEmpty()
  submission_date: Date;

  @IsNotEmpty()
  @IsString()
  massage_amount: string;

  @IsNotEmpty()
  @IsString()
  product_amount: string;

  @IsNotEmpty()
  @IsString()
  submitted_by: string;

  @IsNotEmpty()
  @IsString()
  received_by: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class changeMassageIncomeStatusDto {
  @IsNumber()
  @IsNotEmpty()
  submission_id: number;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  @IsString()
  newStatus: string;
}

export class saveSaleDto {
  @IsString()
  @IsNotEmpty()
  receipt_number: string;

  @IsNumber()
  @IsNotEmpty()
  client_id: number;

  @IsString()
  @IsNotEmpty()
  total_amount: string;

  @IsString()
  @IsNotEmpty()
  balance: string;

  @IsString()
  @IsNotEmpty()
  payment_status: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsString()
  @IsNotEmpty()
  notes?: string;

  @IsString()
  @IsNotEmpty()
  items: string;

  @IsString()
  @IsNotEmpty()
  authorized_by: string;

  @IsDateString()
  @IsNotEmpty()
  sale_date: Date;
}

export class getSaleDto {
  @IsString()
  @IsNotEmpty()
  receipt_number: string;
}

export class fetchClientPurchasesDto {
  @IsString()
  @IsNotEmpty()
  client_id: string;
}

export class saveExpenseDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cost: string;

  @IsString()
  @IsNotEmpty()
  balance: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsString()
  @IsNotEmpty()
  payment_status: string;

  @IsString()
  @IsNotEmpty()
  receipt_image?: string;
}

export class viewExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  expense_id: number;
}

export class updateExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  expense_id: number;

  @IsString()
  category?: string;

  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  cost?: string;

  @IsString()
  balance?: string;

  @IsString()
  payment_method?: string;

  @IsString()
  payment_status?: string;

  @IsString()
  receipt_image?: string;
}

export class registerProductDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  price;
}

export class registerProjectDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  price;
}

export class genericEditDto {
  @IsNumber()
  @IsNotEmpty()
  id;

  @IsString()
  name;

  @IsString()
  price;
}

export class saveProductInventoryRestockDto {
  @IsNotEmpty()
  @IsNumber()
  product_id;

  @IsNotEmpty()
  @IsString()
  quantity;

  @IsNotEmpty()
  @IsString()
  units;

  @IsNotEmpty()
  @IsString()
  source;

  @IsString()
  @IsNotEmpty()
  notes;

  @IsDateString()
  @IsNotEmpty()
  transaction_date;

  @IsString()
  @IsNotEmpty()
  authorized_by;
}

export class saveProductInventoryDepleteDto {
  @IsNotEmpty()
  @IsNumber()
  product_id;

  @IsNotEmpty()
  @IsString()
  quantity;

  @IsNotEmpty()
  @IsString()
  units;

  @IsNotEmpty()
  @IsString()
  destination;

  @IsString()
  @IsNotEmpty()
  notes;

  @IsDateString()
  @IsNotEmpty()
  transaction_date;

  @IsString()
  @IsNotEmpty()
  authorized_by;
}

export class saveProjectInventoryRestockDto {
  @IsNotEmpty()
  @IsNumber()
  project_id;

  @IsNotEmpty()
  @IsString()
  quantity;

  @IsNotEmpty()
  @IsString()
  units;

  @IsNotEmpty()
  @IsString()
  source;

  @IsString()
  @IsNotEmpty()
  notes;

  @IsDateString()
  @IsNotEmpty()
  transaction_date;

  @IsString()
  @IsNotEmpty()
  authorized_by;
}

export class saveProjectInventoryDepleteDto {
  @IsNotEmpty()
  @IsNumber()
  project_id;

  @IsNotEmpty()
  @IsString()
  quantity;

  @IsNotEmpty()
  @IsString()
  units;

  @IsNotEmpty()
  @IsString()
  destination;

  @IsString()
  @IsNotEmpty()
  notes;

  @IsDateString()
  @IsNotEmpty()
  transaction_date;

  @IsString()
  @IsNotEmpty()
  authorized_by;
}

export class genericFindDto {
  @IsNotEmpty()
  @IsNumber()
  id;
}

export class saveClientDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  address: string;
}

export class editClientDto {
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  address: string;
}

export class saveSupplierDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  address: string;
}

export class editSupplierDto {
  @IsNotEmpty()
  @IsNumber()
  supplier_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  address: string;
}

