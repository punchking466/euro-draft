"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TeamPlayer {
  id: string; // resolved from $oid
  name: string;
  backNumber: number;
  position: string;
}

interface Team {
  name: string;
  players: TeamPlayer[];
}

interface TeamHistoryEntry {
  name: string;
  createdAt: string;
  teams: Team[];
}

interface Props {
  data: TeamHistoryEntry[];
}

export function TeamHistoryAccordion({ data }: Props) {
  return (
    <Accordion type="multiple" className="space-y-4">
      {data.map((entry, idx) => (
        <AccordionItem key={idx} value={`entry-${idx}`}>
          <AccordionTrigger>
            <span className="text-lg font-semibold">
              {new Date(entry.createdAt).getFullYear()}년 정기 팀 게임 -{" "}
              {entry.name}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {entry.teams.map((team, teamIdx) => (
                <Card key={teamIdx} className="shadow-md">
                  <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {team.players.length === 0 ? (
                      <div className="text-muted-foreground">
                        팀원이 없습니다.
                      </div>
                    ) : (
                      team.players.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center justify-between rounded border px-3 py-2"
                        >
                          <div className="space-x-2">
                            <Badge variant="secondary">
                              No.{player.backNumber}
                            </Badge>
                            <span className="font-medium">{player.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {player.position}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
