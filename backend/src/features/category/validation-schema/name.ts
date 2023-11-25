import Joi, { ObjectSchema } from 'joi';

const CategoryNameSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(32).messages({
    'string.base': 'Category name must be of type string',
    'string.min': 'category name is too short',
    'string.max': 'category name is too long',
    'string.empty': 'Category name is required'
  })
});

export { CategoryNameSchema };
