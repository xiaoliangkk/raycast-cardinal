import { Toast, getSelectedText, showToast } from "@raycast/api";

import { sendTextToCardinal } from "./lib/cardinal";

export default async function Command() {
  try {
    const selectedText = await getSelectedText();
    await sendTextToCardinal(selectedText, "selected text");
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "No selected text",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
