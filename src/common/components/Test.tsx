interface TestButtonProps {
  label: string;
}

const TestButton = ({ label }: TestButtonProps) => {
  return <button className="rounded bg-blue-500 px-4 py-2 text-white">{label}</button>;
};

export default TestButton;
