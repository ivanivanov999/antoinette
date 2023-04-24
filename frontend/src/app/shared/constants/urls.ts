const BASE_URL = 'http://localhost:5000';

export const ITEMS_URL = BASE_URL + '/api/items';
export const ITEMS_BY_SEARCH_URL = ITEMS_URL + '/search/';
export const ITEM_BY_ID_URL = ITEMS_URL + '/';
export const ITEMS_BY_CATEGORY_URL = ITEMS_URL + '/category/';
export const ITEMS_BY_TAG_URL = ITEMS_URL + '/tag/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const DELIVERIES_URL = BASE_URL + '/api/items/deliveries';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';

export const ADMIN_URL = BASE_URL + '/api/admin';
export const ADMIN_ALL_ORDERS = ADMIN_URL + '/orders';
export const ADMIN_ORDERS_BY_STATUS = ADMIN_URL + '/orders/status/';
export const ADMIN_NEW_ITEM = ADMIN_URL + '/newitem';
export const ADMIN_UPDATE_ORDER = ADMIN_URL + '/updateorder/';

