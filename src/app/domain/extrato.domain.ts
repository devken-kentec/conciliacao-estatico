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
}
