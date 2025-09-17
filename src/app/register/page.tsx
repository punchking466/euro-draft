import { Suspense } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { SiteHeader } from "@/components/site-header";
import { AddPlayerSheet } from "@/components/register/AddPlayerSheet";
import { UserCard } from "@/components/register/UserCard";
import { getAllPlayersGroupedByPosition, getUserTypes } from "@/data/player";

export default async function RegisterPage() {
  const groupedPlayers = await getAllPlayersGroupedByPosition();
  const userTypes = getUserTypes();
  return (
    <>
      <SiteHeader
        pageName="팀원관리"
        rightContent={<AddPlayerSheet userTypes={userTypes} />}
      />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              }
            >
              <div className="space-y-8">
                {Object.entries(groupedPlayers).map(([position, users]) => (
                  <section key={position}>
                    <h2 className="mb-2 text-xl font-bold lg:px-6">
                      {position}
                    </h2>
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                      {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
