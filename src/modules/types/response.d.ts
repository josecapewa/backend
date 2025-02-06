type DataPage<D> ={
  data: D;
  info: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

type PersonFile= {
  arquivo: {
    caminho: string;
    tipo_arquivo: {
      nome: string;
    };
  };
}
