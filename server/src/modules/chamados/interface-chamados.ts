export interface IChamados {
  mensagem: string;
  resumo: string;
  status: string;
  prioridade: number;
  id_usuario: number;
  id_adm?: number;
}
