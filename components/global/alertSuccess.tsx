export default function Success({ text, ...props }: { text: string }) {
  return (
    <div {...props}>
      <div className="alert my-4 flex flex-row items-center rounded-lg border-b-2 border-green-300 bg-green-100 p-5">
        <div className="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-500 bg-green-100">
          <span className="text-green-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <div className="alert-content ml-4">
          <div className="alert-title text-lg font-semibold text-green-800">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
