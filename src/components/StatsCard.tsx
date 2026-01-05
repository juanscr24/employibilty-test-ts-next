interface StatCardProps {
  title: string;
  value: number;
  color: 'blue' | 'green' | 'red' | 'gray';
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, color, icon }: StatCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
  };

  return (
    <div className={`card border-l-4 ${colorClasses[color]}`}>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="opacity-80">{icon}</div>
        </div>
      </div>
    </div>
  );
};

