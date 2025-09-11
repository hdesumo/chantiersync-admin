'use client';

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            {subtitle}
          </p>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
