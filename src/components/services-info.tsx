export default function ServicesInfos({
  label,
  data,
}: {
  label: string;
  data: any;
}) {
  return (
    <li className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{data}</span>
    </li>
  );
}
