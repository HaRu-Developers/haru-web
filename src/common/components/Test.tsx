interface TestButtonProps {
  label: string;
}

const TestButton = ({ label }: TestButtonProps) => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      {label}
    </button>
  );
};

export default TestButton;
