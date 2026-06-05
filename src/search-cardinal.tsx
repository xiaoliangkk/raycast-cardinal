import { LaunchProps } from "@raycast/api";

import { sendTextToCardinal } from "./lib/cardinal";

export default async function Command(
  props: LaunchProps<{ arguments: { query?: string } }>,
) {
  await sendTextToCardinal(props.arguments?.query, "query");
}
