import { dom } from "./domElements";
import { type ViewType } from "../types";

export function switchPage(viewtype: ViewType): void {
  document.querySelectorAll<HTMLElement>('.view-section').forEach((item) => item.classList.remove('active'));
  if (viewtype === 'view-overview') {
    dom.displayOverview.classList.add('active');
  } else if (viewtype === 'view-transactions') {
    dom.displayTransactions.classList.add('active');
  } else if (viewtype === 'view-reports') {
    dom.displayReports.classList.add('active');
  } else if (viewtype === 'view-settings') {
    dom.displaySettings.classList.add('active');
  }
}