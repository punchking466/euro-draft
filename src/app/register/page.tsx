import { Suspense } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { SiteHeader } from "@/components/site-header";
import { AddPlayerSheet } from "@/features/players/components/register/AddPlayerSheet";
import { getAllPlayers, getUserTypes } from "@/features/players/data/player";
import { Skeleton } from "@/components/ui/skeleton";
import { ManageUserView } from "@/features/players/components/register/ManageUserVIew";

export default async function RegisterPage() {
  const players = getAllPlayers();
  const userTypes = getUserTypes();
  return (
    <>
      <SiteHeader
        pageName="팀원관리"
        rightContent={
          <Suspense fallback={<Skeleton className="h-4 w-6" />}>
            <AddPlayerSheet userTypes={userTypes} />
          </Suspense>
        }
      />
      <div className="flex flex-1 flex-col">
        <Suspense
          fallback={
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="grid grid-cols-1 gap-4 py-20 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          }
        >
          <ManageUserView players={players} playerTypes={userTypes} />
        </Suspense>
      </div>
    </>
  );
}
