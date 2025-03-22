type Props = {
    name: string;
    eco: number;
  };
  
  export default function RedeemItem({ name, eco }: Props) {
    return (
      <div className="border rounded-xl p-4 text-center shadow">
        <div className="h-32 bg-gray-100 mb-4 rounded" /> {/* placeholder image */}
        <h4 className="font-medium">{name}</h4>
        <p className="text-green-700 font-bold">{eco} ECO</p>
        <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Redeem</button>
      </div>
    );
  }
  