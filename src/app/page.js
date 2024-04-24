import Image from "next/image";
import HomeTable from "../../layouts/components/homeTable";

export default function Home() {
  return (
    <div className="bg-gray-600">
      <div className="flex flex-col h-screen bg-gray-600 container mx-auto">
        <header className="h-16  bg-gray-600 text-white flex items-center justify-center">
          <h1 className="text-2xl font-bold">Nilai Mahasiswa</h1>
        </header>

        <div className="flex h-8 items-center justify-end">
          <a
            href="/input"
            className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Input
          </a>
        </div>

        <HomeTable />
      </div>
    </div>
  );
}
