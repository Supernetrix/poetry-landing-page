import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetail from "../../components/ProjectDetail";
import FooterSection from "../../components/FooterSection";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";

const fetchOptions = { cache: "no-store" as const };
const liveClient = client.withConfig({ useCdn: false });

export async function generateStaticParams() {
  const projects = await client.fetch(PROJECT_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
  return (projects ?? [])
    .map((project: { slug?: string }) => project.slug)
    .filter(Boolean)
    .map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await liveClient.fetch(PROJECT_BY_SLUG_QUERY, { slug }, fetchOptions);
  if (!project?.name) return { title: "Project — Poetry Designs" };
  return {
    title: `${project.name} — Poetry Designs`,
    description: project.intro || project.note || `Project by Poetry Designs: ${project.name}`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await liveClient.fetch(PROJECT_BY_SLUG_QUERY, { slug }, fetchOptions);
  if (!project) notFound();

  return (
    <main>
      <ProjectDetail project={project} />
      <FooterSection />
    </main>
  );
}
