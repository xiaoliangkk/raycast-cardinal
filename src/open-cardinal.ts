import { Toast, closeMainWindow, showToast } from "@raycast/api";

import { openCardinalApp } from "./lib/cardinal";

export default async function Command() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Opening Cardinal",
  });

  try {
    await openCardinalApp();
    toast.style = Toast.Style.Success;
    toast.title = "Cardinal opened";
    await closeMainWindow({ clearRootSearch: true });
  } catch (error) {
    toast.style = Toast.Style.Failure;
    toast.title = "Could not open Cardinal";
    toast.message = error instanceof Error ? error.message : String(error);
  }
}
