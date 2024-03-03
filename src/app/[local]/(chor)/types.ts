export type Car = {
  id: bigint;
  chassis_number: string;
  brand: string;
  model: string;
  car_type: string;
  transmission: string;
  first_registration: Date;
  mileage: number;
  engine_power: number;
  cylinder: number;
  fuel: string;
  co2: string;
  color: string;
  number_keys: number;
  cer_of_conf: boolean;
  inspection_form: boolean;
  car_pass: boolean;
  register_cert: boolean;
};

export type Client = {
  id: bigint;
  is_company: boolean;
  surname: string | null;
  firstname: string | null;
  company_name: string | null;
  btw_number: string | null;
  street: string;
  postal_code: string;
  city: string;
  country: string;
  email: string | null;
  phone_number: string | null;
  mobile_number: string | null;
};

export type Company = {
  id: bigint;
  company_logo: string | null;
  company_name: string;
  owner_name: string;
  owner_lastname: string;
  vat_number: string;
  street: string;
  zip_code: string;
  city: string;
  country: string;
  owner_email: string;
  owner_phone: string;
};

export type Invoice = {
  id: bigint;
  client_id: bigint;
  car_id: bigint;
  company_id: bigint;
  date: Date;
  due_date: Date;
  advance: number;
  amount: number;
  payment_method: string;
  paid_status: boolean;
  memo: string | null;
};
