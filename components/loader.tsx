import { PulseLoader } from "react-spinners";

const Loader = () => (
  <div className="size-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
    {/* Background overlay */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
    
    <div className="relative z-10 flex flex-col items-center gap-6">
      <div className="modern-card p-8 flex flex-col items-center gap-4">
        <div className="relative">
          <PulseLoader color="#60A5FA" size={15} margin={4} />
          <div className="absolute inset-0 blur-lg opacity-50">
            <PulseLoader color="#A855F7" size={15} margin={4} />
          </div>
        </div>
        <p className="text-white font-medium">Loading...</p>
      </div>
    </div>
  </div>
);

export default Loader;
