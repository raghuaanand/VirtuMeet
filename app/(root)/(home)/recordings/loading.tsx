import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#1C1C2E' }}>
      <Loader />
    </div>
  );
}
