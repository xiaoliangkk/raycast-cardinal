import { Toast, closeMainWindow, getPreferenceValues, showToast } from "@raycast/api";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

interface Preferences {
  cardinalAppName: string;
  cardinalAppPath?: string;
}

export async function openCardinalApp(
  preferences = getPreferenceValues<Preferences>(),
) {
  const appPath = preferences.cardinalAppPath?.trim();

  if (appPath) {
    await execFileAsync("/usr/bin/open", [appPath]);
    return;
  }

  await execFileAsync("/usr/bin/open", [
    "-a",
    preferences.cardinalAppName || "Cardinal",
  ]);
}

async function openCardinalSearchUrl(prompt: string) {
  const url = `cardinal://search?query=${encodeURIComponent(prompt)}`;
  await execFileAsync("/usr/bin/open", [url]);
}

export async function sendTextToCardinal(
  text: string | null | undefined,
  source = "prompt",
) {
  const prompt = text?.trim() ?? "";

  if (!prompt) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Nothing to send",
      message: `Enter ${source}, then press Return.`,
    });
    return;
  }

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Sending to Cardinal",
  });

  try {
    await openCardinalSearchUrl(prompt);

    toast.style = Toast.Style.Success;
    toast.title = "Sent to Cardinal";
    toast.message = "Query sent through cardinal://search.";

    await closeMainWindow({ clearRootSearch: true });
  } catch (error) {
    toast.style = Toast.Style.Failure;
    toast.title = "Could not send to Cardinal";
    toast.message = error instanceof Error ? error.message : String(error);
  }
}
