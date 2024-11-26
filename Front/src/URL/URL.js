export const URL = {
  // Users
  USER_LOGIN: "http://localhost:3001/user/login",
  USER_GET_BYID: "http://localhost:3001/user",
  USER_GET_ONE: "http://localhost:3001/user/getByUsername",
  USER_GET_ALL: "http://localhost:3001/user/getAll",
  USER_REGISTER: "http://localhost:3001/user/register",
  USER_DELETE: "http://localhost:3001/user",
  USER_UPDATE: "http://localhost:3001/user",

  //   Post
  POST_ADD: "http://localhost:3001/post/add",
  POST_GET_ALL: "http://localhost:3001/post/getAll",
  POST_GET_ONE: "http://localhost:3001/post/getOne",
  POST_GET_ONE_BYID: "http://localhost:3001/post",
  POST_DELETE: "http://localhost:3001/post",
  POST_UPDATE: "http://localhost:3001/post",

  //  Category
  CATEGORY_ADD: "http://localhost:3001/category/add",
  CATEGORY_GET_ALL: "http://localhost:3001/category/getAll",
  CATEGORY_GET_ONE: "http://localhost:3001/category/getOne",
  CATEGORY_GET_ONE_BYID: "http://localhost:3001/category",
  CATEGORY_DELETE: "http://localhost:3001/category",
  CATEGORY_UPDATE: "http://localhost:3001/category",

  //   Product
  PRODUCT_ADD: "http://localhost:3001/product/add",
  PRODUCT_GET_ALL: "http://localhost:3001/product/getAll",
  PRODUCT_GET_ONE: "http://localhost:3001/product/getOne",
  PRODUCT_GET_ONE_BYID: "http://localhost:3001/product",
  PRODUCT_DELETE: "http://localhost:3001/product",
  PRODUCT_UPDATE: "http://localhost:3001/product",

  //   Comments
  COMMENT_ADD: "http://localhost:3001/comment/add",
  COMMENT_GET_ALL: "http://localhost:3001/comment/getAll",
  COMMENT_GET_ONE_BYID: "http://localhost:3001/comment",
  COMMENT_DELETE: "http://localhost:3001/comment",

  // Contact
  CONTACT_POST: "http://localhost:3001/contact/post",
};
// Faire attention quand utiliser Docker , rélizer .env a la racine du front et remplacer le localhost par le nom du service
