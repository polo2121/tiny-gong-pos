import DualText from "@/components/DualText";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import ProductRegistrationSection from "@/features/products/components/sections/ProductRegistrationSection";

const BREADCRUMBS = [
  { label: "Inventory", href: "/workspace/inventory" },
  { label: "Products", href: "/workspace/inventory/products" },
  { label: "Create", href: "/workspace/inventory/products/create" },
];

const CreateProductPage = () => {
  return (
    <main className="flex flex-col text-slate-800">
      <BreadcrumbNav breadcrumbs={BREADCRUMBS} className="px-4" />

      <section className="flex items-start justify-between px-4 py-2">
        <DualText
          primary="Product Registration"
          secondary="ကုန်ပစ္စည်းအသစ်ဖန်တီးရန်"
          size="lg"
          className="capitalize"
        />
      </section>

      <section className="mt-4 px-4 pb-6">
        <ProductRegistrationSection />
      </section>
    </main>
  );
};

export default CreateProductPage;
