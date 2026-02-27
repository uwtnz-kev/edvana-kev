import { Mail } from "lucide-react";

export default function EmptyConversation() {
  return (
    <div className="h-full flex items-center justify-center text-center px-6">
      <div>
        <div className="mx-auto h-20 w-20 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md flex items-center justify-center">
          <Mail className="h-10 w-10 text-[#6B4F3A]" />
        </div>
        <div className="mt-6 text-2xl font-semibold text-[#3B240F]">No Conversations Selected</div>
        <div className="mt-2 text-sm text-[#6B4F3A]">Pick a conversation from the left.</div>
      </div>
    </div>
  );
}