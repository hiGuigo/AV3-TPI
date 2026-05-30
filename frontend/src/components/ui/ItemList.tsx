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
            item.aeronave?.modelo && item.cliente
              ? `${item.aeronave.modelo} - ${item.cliente}`
              : item.nome || item.modelo || item.username || "Sem título"
          }
          subtitle={
            item.createdAt
              ? new Date(item.createdAt).toLocaleDateString("pt-BR")
              : undefined
          }
          detailsRoute={`${detailsBaseRoute}/${item.id}`}
          editRoute={editBaseRoute ? `${editBaseRoute}/${item.id}` : undefined}
          showEdit={showEdit}
        />
      ))}
    </div>
  );
}
