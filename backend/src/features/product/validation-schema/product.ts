import Joi, { ObjectSchema } from 'joi';

const ProductValidationSchema: ObjectSchema = Joi.object().keys({
  images: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.base': 'Product image must be an array',
    'array.min': 'At least one product image is required'
  }),
  title: Joi.string().required().min(3).max(32).trim().messages({
    'string.base': 'Title must be of type string',
    'string.min': 'Title is too short',
    'string.max': 'Title is too long',
    'string.empty': 'Title is required'
  }),
  description: Joi.string().optional().max(2000).trim().messages({
    'string.max': 'Description name is too long'
  }),
  price: Joi.number().precision(2).required().messages({
    'number.base': 'Price must be of type number',
    'number.precision': 'Price can have up to 2 decimal places',
    'number.empty': 'Price is required'
  }),
  shipping: Joi.string().required().messages({
    'string.empty': 'Shipping is required'
  }),
  quantity: Joi.string().required().messages({
    'string.empty': 'Quantity is required'
  }),
  color: Joi.string().required().messages({
    'string.empty': 'Color is required'
  }),
  brand: Joi.string().required().messages({
    'string.empty': 'Brand is required'
  }),
  category: Joi.string().optional(),
  subCategory: Joi.array().items(Joi.string()).optional()
});

export { ProductValidationSchema };
