export interface Item {
  id: string;
  nome?: string;
  modelo?: string;
  username?: string;
  createdAt?: string;
}

export interface ItemListProps {
  items: Item[];
  detailsBaseRoute: string;
  editBaseRoute?: string;
  showEdit: boolean;
}
