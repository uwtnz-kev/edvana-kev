import { Mail } from "lucide-react";

export default function MessagesHeader() {
  return (
    <div className="flex items-center gap-5">
      <div
        className="
          h-12 w-12
          rounded-2xl
          flex items-center justify-center
          bg-[#1EA896]
        "
      >
        <Mail className="h-6 w-6 text-[#3B240F]" />
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-[#3B240F] leading-tight">
          Messages
        </h1>
        <p className="mt-1 text-[#6B4F3A] text-base">
          Manage conversations across your classes
        </p>
      </div>
    </div>
  );
}