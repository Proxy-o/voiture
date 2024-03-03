import InvoiceView from "../components/invoiceView";

export default function Page({ params }: { params: { slug: string } }) {
  return <InvoiceView invoiceId={params.slug} />;
}
