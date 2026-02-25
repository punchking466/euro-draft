"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Share, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { handleShareKakao } from "@/lib/KakaoScript";
import { formatDateTypeB } from "@/utils/dateFormat";
import Link from "next/link";

interface TeamPlayer {
  id?: string;
  name: string;
  backNumber: number;
  position: string;
  isGuest: boolean;
}

interface Team {
  name: string;
  players: TeamPlayer[];
}

interface TeamHistoryEntry {
  id: string;
  name: string;
  createdAt: Date;
  teams: Team[];
}

interface Props {
  data: TeamHistoryEntry[];
}

export function TeamSnapshotsAccordion({ data }: Props) {
  return (
    <Accordion type="multiple" className="space-y-4">
      {data.map((entry, idx) => (
        <AccordionItem key={idx} value={`entry-${idx}`}>
          <AccordionTrigger>
            <div className="flex w-full items-end justify-between">
              <span className="text-lg font-semibold">
                {/* {new Date(entry.createdAt).getFullYear()}년 정기 팀 게임 -{" "} */}
                {entry.name}
              </span>
              <p className="text-[10px]">{formatDateTypeB(entry.createdAt)}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-3 flex w-full justify-end gap-4">
              <ButtonGroup>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleShareKakao(
                      [
                        {
                          name: "Team 1",
                          players: ["aa", "bb"],
                        },
                        {
                          name: "Team 2",
                          players: ["aa", "bb"],
                        },
                      ],
                      new Date(),
                    );
                  }}
                >
                  <Share className="h-4 w-4" />
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/team/builder?teamId=${entry.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </ButtonGroup>
            </div>
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
                          key={player.id ?? `${team.name}:${player.name}:${player.backNumber}`}
                          className="flex items-center justify-between rounded border px-3 py-2"
                        >
                          <div className="space-x-2">
                            <Badge variant="secondary">
                              No.{player.backNumber}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {player.position}
                            </Badge>
                            <span className="font-medium">{player.name}</span>
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
