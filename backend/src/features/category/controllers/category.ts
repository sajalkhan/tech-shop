import slugify from 'slugify';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@global/helpers/error-handler';
import { categoryService } from '@service/db/category.service';
import { CategoryNameSchema } from '@category/validation-schema/name';
import { joiValidation } from '@global/decorators/joi-validation-decorator';

export class Category {
  @joiValidation(CategoryNameSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const isExistingCategory = await categoryService.getCategoryByName(name);
    if (isExistingCategory) throw new BadRequestError('Category Already Exists!');

    const data = { name, slug: slugify(name) };
    await categoryService.createCategory(data as never);

    res.status(HTTP_STATUS.CREATED).json({ message: 'Category Added successfully', data });
  }

  public async red(req: Request, res: Response): Promise<void> {
    const { slug } = req.params;
    const category = await categoryService.getCategoryBySlug(slug);
    if (!category) throw new BadRequestError('Category not found!');

    res.status(HTTP_STATUS.OK).json(category);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const { slug } = req.params;
    const category = await categoryService.updateCategory(name, slug);
    if (!category) throw new BadRequestError('Category update failed!');

    res.status(HTTP_STATUS.OK).json(category);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const deletedCategory = await categoryService.deleteCategoryBySlug(slug);

      if (!deletedCategory) {
        throw new BadRequestError('Category not found!');
      }

      res.status(HTTP_STATUS.OK).json({
        message: 'Category deleted successfully',
        deletedCategory
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Internal Server Error ${error}` });
    }
  }

  public async categoryList(_req: Request, res: Response): Promise<void> {
    const allCategory = await categoryService.getAllCategory();
    if (!allCategory) throw new BadRequestError('No Category Found!');

    res.status(HTTP_STATUS.OK).json(allCategory);
  }
}
