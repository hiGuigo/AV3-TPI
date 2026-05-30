export interface Item {
  id: string;
  nome?: string;
  modelo?: string
}

export interface ItemListProps {
  items: Item[];



  detailsBaseRoute: string;
  editBaseRoute: string;
}