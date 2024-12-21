export interface CreateCategoryModel {
  name: string;
}

export interface UpdateCategoryModel extends CreateCategoryModel {
  id: string;
}
