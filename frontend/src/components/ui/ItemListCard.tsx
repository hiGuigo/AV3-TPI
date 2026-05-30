import { useNavigate } from "react-router-dom";

import { Button } from "./Button";
import type { ItemListCardProps } from "../../types/components/ItemListCard";

export function ItemListCard({
  id,
  title,
  detailsRoute,
  editRoute,
  showEdit = true,
}: ItemListCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 my-4 rounded-md bg-gray-300">
      <div className="flex flex-col">
        <p className="font-bold text-lg">{title}</p>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => navigate(detailsRoute || `/item/${id}`)}
          className="bg-blue-600"
        >
          Detalhes
        </Button>

        {showEdit && (
          <Button
            onClick={() => navigate(editRoute || `/item/${id}/editar`)}
            className="bg-blue-600"
          >
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}
