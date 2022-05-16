import { CgSpinner } from 'react-icons/cg'

export default function FullPageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <CgSpinner className="mb-4 text-6xl animate-spin" />
      <p>Loading...</p>
    </div>
  )
}
