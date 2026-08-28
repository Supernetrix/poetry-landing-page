import ProjectsMosaic from "../components/ProjectsMosaic";
import FooterSection from "../components/FooterSection";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

const fetchOptions = { next: { revalidate: 60 } };

export const metadata = {
  title: "Projects — Poetry Designs",
  description: "Selected homes and estates by Poetry Designs.",
};

export default async function ProjectsPage() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, fetchOptions);

  return (
    <main>
      <ProjectsMosaic projects={projects ?? []} />
      <FooterSection />
    </main>
  );
}
