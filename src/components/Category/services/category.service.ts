import Category from '../models/Category';
import { CreateCategoryModel, UpdateCategoryModel } from '../models/Request.model';
import { categoryUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await petitionWithToken(categoryUrlApi.categories, '', 'GET');
  const data = await response.json();
  return data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const url = `${categoryUrlApi.categories}/getById?id=${id}`;
  const response = await petitionWithToken(url, '', 'GET');
  const data = await response.json();
  return data;
};

export const createCategory = async (category: CreateCategoryModel) => {
  const response = await petitionWithToken(categoryUrlApi.categories, category, 'POST');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};

export const updateCategory = async (category: UpdateCategoryModel) => {
  const response = await petitionWithToken(categoryUrlApi.categories, category, 'PATCH');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};

export const deleteCategory = async (id: string) => {
  const url = `${categoryUrlApi.categories}?id=${id}`;
  const response = await petitionWithToken(url, '', 'DELETE');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};
