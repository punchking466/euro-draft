import { UserCard } from "@/components/register/UserCard";
import { getAllPlayersGroupedByPosition } from "@/data/player";

export default async function RegisterGrid() {
  const groupedPlayers = await getAllPlayersGroupedByPosition();
  // const userTypes = await getUserTypes();
  // console.log(userTypes);
  return (
    <div className="space-y-8">
      {Object.entries(groupedPlayers).map(([position, users]) => (
        <section key={position}>
          <h2 className="mb-2 text-xl font-bold lg:px-6">{position}</h2>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
