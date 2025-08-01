import { PulseLoader } from "react-spinners";

const Loader = () => (
  <div className="size-full flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#1C1C2E' }}>
    <div className="flex flex-col items-center gap-3 p-6 rounded-lg" style={{ backgroundColor: '#242438' }}>
      <PulseLoader color="#1ABC9C" size={12} margin={3} />
      <p style={{ color: '#E0E0E0' }} className="font-medium text-sm">Loading...</p>
    </div>
  </div>
);

export default Loader;

