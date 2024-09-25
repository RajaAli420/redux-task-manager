import { useRouter } from "next/navigation";
const BackButton = () => {
  const router = useRouter(); // For Next.js

  const goBack = () => {
    router.push("/");
  };

  return (
    <button
      onClick={goBack}
      className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow-md transition duration-300"
    >
      &larr; Back
    </button>
  );
};

export default BackButton;
