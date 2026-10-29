import { NextStudio } from "next-sanity/studio";
import { redirect } from "next/navigation";
import config from "../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (process.env.NODE_ENV === "production") {
    redirect("https://www.sanity.io/@oHdllsxcg/studio/htodbd51hxl3657anwpvkpys/default/structure");
  }
  return <NextStudio config={config} />;
}
