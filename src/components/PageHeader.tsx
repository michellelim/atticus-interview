type PageHeaderProps = {
  title: string;
};

export default function PageHeader(props: PageHeaderProps) {
  const { title } = props;

  return (
    <header className="items-center flex flex-row p-4">
      <h1 className="text-4xl font-semibold">{title}</h1>
    </header>
  );
}
