import CertificationsPage from "../components/CertificationsPage";
import FooterSection from "../components/FooterSection";
import { client } from "@/sanity/lib/client";
import { CERTIFICATES_QUERY } from "@/sanity/lib/queries";

const fetchOptions = { next: { revalidate: 60 } };

export const metadata = {
  title: "Certifications — Poetry Designs",
  description: "Industry certifications and memberships held by Poetry Designs, including IGBC.",
};

export default async function CertificationsRoute() {
  const certificates = await client.fetch(CERTIFICATES_QUERY, {}, fetchOptions);

  return (
    <main>
      <CertificationsPage certificates={certificates ?? []} />
      <FooterSection />
    </main>
  );
}
