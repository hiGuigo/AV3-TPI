import { ItemListCard } from "./ItemListCard";

import type { ItemListProps } from "../../types/components/ItemList";

export function ItemList({
  items,
  detailsBaseRoute,
  editBaseRoute,
  showEdit,
}: ItemListProps) {
  return (
    <div>
      {items.map((item) => (
        <ItemListCard
          key={item.id}
          id={item.id}
          title={
            item.nome ||
            item.modelo ||
            item.username || 
            new Date(item.createdAt).toLocaleDateString("pt-BR")
          }
          detailsRoute={`${detailsBaseRoute}/${item.id}`}
          editRoute={`${editBaseRoute}/${item.id}`}
          showEdit={showEdit}
        />
      ))}
    </div>
  );
}
