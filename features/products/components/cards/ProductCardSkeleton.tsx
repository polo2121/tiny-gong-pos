import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="h-full flex-row justify-center border-slate-200 bg-white shadow-sm">
      <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-[16px] bg-slate-200" />

      <div className="flex-1">
        <CardHeader className="gap-2">
          <div className="h-5 w-40 animate-pulse rounded-md bg-slate-200" />
          <div className="h-3 w-24 animate-pulse rounded-md bg-slate-200" />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-3 w-16 animate-pulse rounded-md bg-slate-200" />

            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200" />
              <div className="h-7 w-14 animate-pulse rounded-full bg-slate-200" />
              <div className="h-7 w-12 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
