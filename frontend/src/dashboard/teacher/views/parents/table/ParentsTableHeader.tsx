// Column header row for the parents workspace table.
export function ParentsTableHeader() {
  return (
    <thead className="bg-white/20">
      <tr className="text-sm text-[#6B4F3A]">
        <th className="px-6 py-4 font-semibold w-[220px]">Parent</th>
        <th className="px-6 py-4 font-semibold w-[260px]">Email</th>
        <th className="px-6 py-4 font-semibold w-[170px]">Phone</th>
        <th className="px-6 py-4 font-semibold">Students</th>
        <th className="px-6 py-4 font-semibold w-[110px] text-center">Actions</th>
      </tr>
    </thead>
  );
}
