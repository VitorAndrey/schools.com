export type School = {
  id_escola?: string;
  nome?: string;
  id_municipio?: string;
  sigla_uf?: string;
  rede?: string;
  ensino?: string;
};

interface MetricData {
  ano: string;
  nota: string | null; // Pode ser um número ou null
}

// Definição do tipo para os diferentes tipos de métricas (ideb, taxa_aprovacao, indicador_rendimento, nota_saeb_lingua_portuguesa)
interface Years {
  "iniciais(1-5)": MetricData[];
  "finais(6-9)": MetricData[];
  "todos(1-4)": MetricData[];
}

// Definição do tipo para os dados completos
export interface Metric {
  nome: string;
  data: {
    ideb: Years;
    taxa_aprovacao: Years;
    indicador_rendimento: Years;
    nota_saeb_lingua_portuguesa: Years;
  };
}
