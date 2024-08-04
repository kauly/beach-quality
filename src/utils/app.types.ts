export type ImaItem = {
  CODIGO: string;
  MUNICIPIO_COD_IBGE: string;
  MUNICIPIO: string;
  PONTO_NOME: string;
  BALNEARIO: string;
  LOCALIZACAO: string;
  LATITUDE: string;
  LONGITUDE: string;
  ANALISES: Analises[];
};

export interface Analises {
  DATA: string;
  CONDICAO: string;
  CHUVA: string;
  RESULTADO: string;
}
