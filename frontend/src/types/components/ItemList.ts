export interface Item {
  id: string;

  nome?: string;
  modelo?: string;
  username?: string;

  cliente?: string;

  createdAt?: string;

  aeronave?: {
    modelo: string;
  };
}

export interface ItemListProps {
  items: Item[];
  detailsBaseRoute: string;
  editBaseRoute?: string;
  showEdit: boolean;
}
