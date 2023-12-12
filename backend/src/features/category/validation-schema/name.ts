import Joi, { ObjectSchema } from 'joi';

const CategoryNameSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(32).trim().lowercase().messages({
    'string.base': 'Category name must be of type string',
    'string.min': 'Category name is too short',
    'string.max': 'Category name is too long',
    'string.empty': 'Category name is required'
  })
});

const SubCategorySchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(32).trim().lowercase().messages({
    'string.base': 'SubCategory name must be of type string',
    'string.min': 'SubCategory name is too short',
    'string.max': 'SubCategory name is too long',
    'string.empty': 'SubCategory name is required'
  }),
  parent: Joi.string().required().messages({
    'string.empty': 'SubCategory name is required'
  })
});

export { CategoryNameSchema, SubCategorySchema };
