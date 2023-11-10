import { MainPayer } from "./MainPayer";

export type NannyEarnDto = {
  totalEarn: number,
  mainPeopleWhoHireHer: MainPayer[],
}