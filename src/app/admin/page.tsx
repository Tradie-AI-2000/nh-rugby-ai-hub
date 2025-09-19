import { getSubmissions } from "@/lib/actions";
import { SubmissionsTable } from "./submissions-table";
import Image from 'next/image';

export default async function AdminPage() {
  const result = await getSubmissions();

  if (!result.success) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Submissions</h2>
        <p className="text-red-500">{result.error}</p>
      </div>
    );
  }

  // The result.data could be undefined if success is true, so we need to handle that
  const submissions = result.data || [];

  return (
    <div>
      
      <h2 className="text-2xl font-semibold mb-4">Submissions</h2>
      <SubmissionsTable submissions={submissions} />
    </div>
  );
}
