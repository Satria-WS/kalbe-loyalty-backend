import Joi from 'joi';
import { UserPostBody, UserPutBody, UsersGetQuery } from '../interfaces/user.interface';

export function userValidatorsGetList(data: UsersGetQuery) {
  const schema = Joi.object({
    name: Joi.string().allow(null, ''),
    first_name: Joi.string().allow(null, ''),
    last_name: Joi.string().allow(null, ''),
    email: Joi.string().allow(null, ''),
    current_page: Joi.number().required(),
    take: Joi.number().required(),
    cache: Joi.boolean().allow(null, '')
  });

  return schema.validate(data);
}

export function userValidatorsPost(user: UserPostBody) {
  const schema = Joi.object({
    first_name: Joi.string().min(1).max(255).required(),
    last_name: Joi.string().min(1).max(255).allow(null, ''),
    address: Joi.string().min(5).max(255).allow(null, ''),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    roles: Joi.array().items(Joi.number()).required(),
    company: Joi.string().min(1).max(255).allow(null, '')
  });

  return schema.validate(user);
}

export function userValidatorsPut(user: UserPutBody) {
  const schema = Joi.object({
    first_name: Joi.string().min(1).max(255),
    last_name: Joi.string().min(1).max(255).allow(null, ''),
    address: Joi.string().min(5).max(255).allow(null, ''),
    email: Joi.string().min(5).max(255).email(),
    roles: Joi.array().items(Joi.number()),
    company: Joi.string().min(1).max(255).allow(null, '')
  });

  return schema.validate(user);
}
