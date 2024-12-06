export default function FriendsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div className="flex flex-col h-screen bg-gray-100">{children}</div>;
  }