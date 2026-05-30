export interface Item {
  id: string;
  nome?: string;
  modelo?: string;
  createdAt?: string;
}

export interface ItemListProps {
  items: Item[];
  detailsBaseRoute: string;
  editBaseRoute?: string;
  showEdit: boolean;
}
