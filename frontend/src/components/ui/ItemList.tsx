import { ItemListCard } from "./ItemListCard";

import type { ItemListProps } from "../../types/components/ItemList";

export function ItemList({
  items,
  detailsBaseRoute,
  editBaseRoute,
}: ItemListProps) {
  return (
    <div>
      {items.map((item) => (
        <ItemListCard
          key={item.id}
          id={item.id}
          title={item.nome || item.modelo}
          detailsRoute={`${detailsBaseRoute}/${item.id}`}
          editRoute={`${editBaseRoute}/${item.id}`}
        />
      ))}
    </div>
  );
}
