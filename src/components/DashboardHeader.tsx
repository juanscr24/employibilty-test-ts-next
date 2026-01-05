interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <header>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          <p className="text-gray-600">
            {subtitle}
          </p>
      </header>
  );
}
