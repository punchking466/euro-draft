// components/skeletons/SkeletonCard.tsx

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="@container/card animate-pulse">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <Skeleton className="h-6 w-1/2" />
        </CardTitle>
        <CardAction>
          <Skeleton className="mr-2 h-5 w-12 rounded-full" />
        </CardAction>
      </CardHeader>

      <CardContent className="text-muted-foreground flex flex-col gap-2 text-sm">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
