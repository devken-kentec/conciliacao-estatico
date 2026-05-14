export interface Extrato {
  id: number;
  data: string;
  lancamento: string;
  razaoSocial: string;
  cnpjCpf: string;
  credito: number;
  debito: number;
  saldo: number;
  agenciaContaId: number;
  banco: string;
  agencia: string;
  conta: string;
  statusCredito: boolean;
  statusDebito: boolean;
  statusCreditoConciliado: boolean;
  statusDebitoConciliado: boolean;
}

export interface ExtratoEquivalente {
  id: number;
  credito: number;
  creditoId: number;
  dataCred: string;
  dataDeb: string;
  debito: number;
  debitoId: number;
}

export interface ExtratoConciliado {
  id: number;
  creditoExtratoId: number;
  creditoContabilId: number;
  creditoContabil: number;
  creditoExtrato: number;
  dataCreditoContabil: string;
  dataCreditoExtrato: string;
  debitoExtratoId: number;
  debitoContabilId: number;
  dataDebitoExtrato: string;
  dataDebitoContabil: string;
  debitoExtrato: number;
  debitoContabil: number;
}


