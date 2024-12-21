export default function Button({ nameProp }) {
  return (
    <>
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
        {nameProp}
      </button>
    </>
  );
}
