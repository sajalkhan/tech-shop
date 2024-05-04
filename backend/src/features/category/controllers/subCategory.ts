/* eslint-disable @typescript-eslint/no-explicit-any */
import slugify from 'slugify';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@global/helpers/error-handler';
import { SubCategoryService } from '@service/db/subCategory.service';
import { SubCategorySchema } from '@category/validation-schema/name';
import { joiValidation } from '@global/decorators/joi-validation-decorator';

export class SubCategory {
  @joiValidation(SubCategorySchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { name, parent } = req.body;
    const isExistingCategory = await SubCategoryService.getSubCategoryByName(name);
    if (isExistingCategory) throw new BadRequestError('SubCategory Already Exists!');

    const data = { name, parent, slug: slugify(name) };
    await SubCategoryService.createSubCategory(data as never);

    res.status(HTTP_STATUS.CREATED).json({ message: 'SubCategory Added successfully', data });
  }

  public async red(req: Request, res: Response): Promise<void> {
    const { slug } = req.params;
    const category = await SubCategoryService.getSubCategoryBySlug(slug);
    if (!category) throw new BadRequestError('SubCategory not found!');

    res.status(HTTP_STATUS.OK).json(category);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const { slug } = req.params;
    const category = await SubCategoryService.updateSubCategory(name, slug);
    if (!category) throw new BadRequestError('SubCategory update failed!');

    res.status(HTTP_STATUS.OK).json(category);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const deletedCategory = await SubCategoryService.deleteSubCategoryBySlug(slug);

      if (!deletedCategory) {
        throw new BadRequestError('SubCategory not found!');
      }

      res.status(HTTP_STATUS.OK).json({
        message: 'SubCategory deleted successfully',
        deletedCategory
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Internal Server Error ${error}` });
    }
  }

  public async subCategoryList(_req: Request, res: Response): Promise<void> {
    const allSubCategory = await SubCategoryService.getAllSubCategory();
    if (!allSubCategory) throw new BadRequestError('No SubCategory Found!');

    res.status(HTTP_STATUS.OK).json(allSubCategory);
  }

  public async subCategoryListByParentId(req: Request, res: Response): Promise<void> {
    const { parent } = req.body;
    const allSubCategory = await SubCategoryService.getAllSubCategoryByParentId(parent);

    res.status(HTTP_STATUS.OK).json(allSubCategory);
  }

  public async getAllProductBySubCategory(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const product = await SubCategoryService.getAllProductBySubCategory(slug);
      if (!product.subCategory) throw new Error('No Sub Category Found!');

      res.status(HTTP_STATUS.OK).json(product);
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
