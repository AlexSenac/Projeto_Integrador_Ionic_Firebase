import { Endereco } from './endereco.model';

export class Produto {
  id!: string;
  name!: string;
  type!: string;
  amount!: string;
  purchasePrice!: string;
  percentage!: string;
  saleValue!: string;
  supplier!: string;
  email!: string;
  cnpj!: string;
  phone!: string;
  imageUrl!: string;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  localidade!: string;
  endereco!: Endereco;
}
