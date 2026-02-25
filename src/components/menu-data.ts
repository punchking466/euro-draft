import {
  Users,
  LucideIcon,
  ClipboardList,
  UserPen,
  ShieldPlus,
  Save,
  UserCircle2,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/register",
          label: "팀원관리",
          icon: UserPen,
        },
      ],
    },
    {
      groupLabel: "경기",
      menus: [
        {
          href: "",
          label: "팀구성",
          icon: Users,
          submenus: [
            {
              href: "/team/builder",
              label: "팀 생성/수정",
              icon: ShieldPlus,
            },
            {
              href: "/team/snapshots",
              label: "생성된 팀",
              icon: Save,
            },
          ],
        },
        {
          href: "",
          label: "경기기록",
          icon: ClipboardList,
          submenus: [
            {
              href: "scordcards/team",
              label: "팀 스코어카드",
              icon: ClipboardList,
            },
            {
              href: "scordcards/player",
              label: "개인 스코어카드",
              icon: UserCircle2,
            },
          ],
        },
      ],
    },
  ];
}
