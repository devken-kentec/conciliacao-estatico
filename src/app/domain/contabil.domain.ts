export interface Contabil {
    id: number;
	  banco: string;
	  agencia: string;
	  conta: string;
    orgao: string;
    data: string;
    credor: string;
    tipoDocumento: string;
    numeroDocumento: string;
    movimento: string;
    fonteDetalhada: string;
    debito: number;
    statusDebito: boolean;
    credito: number;
    statusCredito: boolean;
    saldo: number;
}
