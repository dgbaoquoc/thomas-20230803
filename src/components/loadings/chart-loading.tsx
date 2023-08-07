import { Icons } from "@/components/icons";

export default function ChartLoading() {
  return (
    <div className="h-[350px] w-full flex justify-center items-center">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Getting data ...
    </div>
  );
}
