import { School } from "@/models";
import Link from "next/link";
import { Button } from "./ui/button";
import { BarChartBigIcon } from "lucide-react";

type SchoolsTableProps = {
  data: School[] | null;
};

export function SchoolsTable({ data }: SchoolsTableProps) {
  return (
    <div
      className="bg-white w-[95%] mx-auto max-w-3xl rounded-2xl border 
    my-8 px-4 py-1 shadow-xl"
    >
      <div className="flex p-4 gap-8 items-center border-b">
        <h3 className="flex-1 truncate">Escola</h3>

        <h3 className="w-16 text-center">Dados</h3>
      </div>

      {data?.map((school: School, index) => (
        <div
          className={`flex p-4 gap-8 items-center ${
            index !== data.length - 1 && "border-b"
          }`}
          key={school.id_escola}
        >
          <h3 className="flex-1 truncate">{school.nome}</h3>

          <Link
            className="w-16 flex items-center justify-center"
            href={`/dashboard/${school.id_escola}`}
          >
            <Button size="icon" variant="ghost">
              <BarChartBigIcon color="black" size={18} />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
