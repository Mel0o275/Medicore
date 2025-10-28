export default function SubmitButton() {
  return (
      <div className="flex items-center space-x-3 mt-4">
          <button
              className="bg-main text-white px-4 py-2 rounded-md shadow hover:bg-main-hover transform hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-150">
              SUBMIT Feedback
          </button>
      </div>
  );
}