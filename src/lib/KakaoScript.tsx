"use client";

import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoScript() {
  const onLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      onLoad={onLoad}
    />
  );
}

export const handleShareKakao = (
  teams: { name: string; players: string[] }[],
  date: Date,
) => {
  const { Kakao } = window;
  Kakao.Share.sendDefault({
    objectType: "text",
    text: generateTeamText(teams, date),
    link: {
      mobileWebUrl: "",
      webUrl: "",
    },
  });
};

export function generateTeamText(
  teams: { name: string; players: string[] }[],
  date: Date,
) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const lines: string[] = [`Team Euro ${year}년 ${month}월 ${day}일\n`];

  for (let i = 0; i < teams.length; i += 2) {
    const count = teams[i + 1] ? 2 : 1;
    if (count % 2 === 0) {
      lines.push(`${teams[i].name.padEnd(18)} ${teams[i + 1].name}`);
      const maxLength =
        teams[i].players.length >= teams[i + 1].players.length
          ? teams[i].players.length
          : teams[i + 1].players.length;

      for (let j = 0; j < maxLength; j++) {
        const blackPlayer = teams[i].players[j] ?? "------------ ";
        const whitePlayer = teams[i + 1].players[j] ?? "------------ ";
        lines.push(
          `${j + 1}. ${blackPlayer.padEnd(10)} ${j + 1}. ${whitePlayer}`,
        );
      }
    } else {
      lines.push(`${teams[i].name}`);
      for (const player of teams[i].players) {
        lines.push(player);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

export default KakaoScript;
