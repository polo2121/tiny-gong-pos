import NavigationLink from "@/components/NavigationLink";
import React from "react";

const WorkspaePage = async () => {
  // const data = await productService.searchProducts({
  //   query: "flow",
  //   searchBy: "name",
  //   cursor: null,
  //   limit: 50,
  // });
  return (
    <section className="m-auto w-full max-w-3xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <NavigationLink href="#" variant="sales">
          <div className="space-y-1">
            <span className="block font-umoe text-sm text-white/80">
              (နေ့စဉ်အရောင်းစာရင်း)
            </span>
            <h2 className="font-chewy text-2xl text-white">Daily Sales</h2>
          </div>
          <p className="line-clamp-2 font-quicksand text-sm font-medium text-white/75">
            Track daily selling activity, follow performance, and keep each
            transaction moving smoothly.
          </p>
        </NavigationLink>
        <NavigationLink href="/inventory" variant="inventory">
          <div className="space-y-1">
            <span className="block font-umoe text-sm text-white/80">
              (ပစ္စည်းစာရင်း စီမံခန့်ခွဲမှု)
            </span>
            <h2 className="font-chewy text-2xl text-white">Inventory</h2>
          </div>
          <p className="line-clamp-2 font-quicksand text-sm font-medium text-white/75">
            Manage product details, organize variants, and keep your catalog
            clean and accurate.
          </p>
        </NavigationLink>
        <NavigationLink href="/inventory" variant="stocks">
          <div className="space-y-1">
            <span className="block font-umoe text-sm text-white/80">
              (ပစ္စည်းလက်ကျန် စောင့်ကြည့်မှု)
            </span>
            <h2 className="font-chewy text-2xl text-white">Stock Levels</h2>
          </div>
          <p className="line-clamp-2 font-quicksand text-sm font-medium text-white/ 75">
            Monitor stock levels, spot low items early, and keep essentials
            ready for sale.
          </p>
        </NavigationLink>
      </div>
    </section>
  );
};

export default WorkspaePage;
