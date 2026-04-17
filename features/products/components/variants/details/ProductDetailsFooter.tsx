import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProductDetailsFooterProps = {
  onAddVariant?: () => void;
  onAddProduct?: () => void;
};

const ProductDetailsFooter = ({
  onAddVariant,
  onAddProduct,
}: ProductDetailsFooterProps) => {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:justify-end">
        <Button variant="outline" size="lg" onClick={onAddVariant}>
          Add New Variant
        </Button>
        <Button size="lg" onClick={onAddProduct}>
          Add New Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsFooter;
