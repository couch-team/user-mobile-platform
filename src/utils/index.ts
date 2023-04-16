import { store } from '../redux/store';

export const getModelKeys = (model: any) =>
  Object.keys(model.effects({})).map(a => `${model.name}/${a}`);

export const getAllModels = () => {
  return store.getState();
};

export const formatAmount = (value: string) =>
  Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
