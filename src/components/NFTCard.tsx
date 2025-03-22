type Props = {
    name: string;
    month: string;
  };
  
  export default function NFTCard({ name, month }: Props) {
    return (
      <div className="border rounded-xl p-4 text-center bg-white shadow">
        <div className="h-24 bg-gray-200 mb-2 rounded" /> {/* placeholder image */}
        <h5 className="font-semibold">{name}</h5>
        <p className="text-sm text-gray-500">Planted: {month} 2025</p>
      </div>
    );
  }
  