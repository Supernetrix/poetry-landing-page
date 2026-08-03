import PortfolioGrid from "../components/PortfolioGrid";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

const fetchOptions = { next: { revalidate: 60 } };

export default async function EstatesPage() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, fetchOptions);

  return (
    <main style={{ backgroundColor: "var(--c-bg)", minHeight: "100vh" }}>
      <PortfolioGrid projects={projects} isHomePage={false} />
    </main>
  );
}
