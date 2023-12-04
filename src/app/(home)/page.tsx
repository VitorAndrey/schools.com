import { SchoolsTable } from "@/components/schools-table";
import { fetchSchools } from "@/services/fetchSchools";

export default async function Home() {
  const schools = await fetchSchools();

  return (
    <main>
      <SchoolsTable data={schools} />
    </main>
  );
}
