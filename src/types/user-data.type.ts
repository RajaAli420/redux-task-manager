interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AccountInfo {
  username: string;
  password: string;
}

export interface UserData {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  accountInfo: AccountInfo;
}

interface UpdatePersonalInfoAction {
  type: "UPDATE_PERSONAL_INFO";
  payload: PersonalInfo;
}

interface UpdateAddressInfoAction {
  type: "UPDATE_ADDRESS_INFO";
  payload: AddressInfo;
}

interface UpdateAccountInfoAction {
  type: "UPDATE_ACCOUNT_INFO";
  payload: AccountInfo;
}

// Combine action types
export type UserAction =
  | UpdatePersonalInfoAction
  | UpdateAddressInfoAction
  | UpdateAccountInfoAction;
