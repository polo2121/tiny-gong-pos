import NavigationLink from "@/components/NavigationLink";
import React from "react";

const WORKSPACE_LINKS = [
  {
    href: "#",
    variant: "sales",
    labelMm: "(နေ့စဉ်အရောင်းစာရင်း)",
    title: "Daily Sales",
    description:
      "Track daily selling activity, follow performance, and keep each transaction moving smoothly.",
  },
  {
    href: "/workspace/inventory",
    variant: "inventory",
    labelMm: "(ပစ္စည်း စီမံခန့်ခွဲ)",
    title: "Inventory",
    description:
      "Manage product details, organize variants, and keep your catalog clean and accurate.",
  },
  {
    href: "/inventory",
    variant: "stocks",
    labelMm: "(ပစ္စည်းလက်ကျန်)",
    title: "Stock Levels",
    description:
      "Monitor stock levels, spot low items early, and keep essentials ready for sale.",
  },
  // {
  //   href: "#",
  //   variant: "capital",
  //   labelMm: "(အရင်းအနှီး)",
  //   title: "Capital",
  //   description:
  //     "Track invested capital, review available funds, and keep your business foundation financially clear.",
  // },
  {
    href: "#",
    variant: "profits",
    labelMm: "(အမြတ်အစွန်း)",
    title: "Profit",
    description:
      "Review profit performance, understand margins, and see how each sale contributes to growth.",
  },
  {
    href: "#",
    variant: "expenses",
    labelMm: "(အသုံးစရိတ်)",
    title: "Expense",
    description:
      "Track expenses clearly, organize spending records, and keep business costs under control.",
  },
  {
    href: "#",
    variant: "customers",
    labelMm: "(ဖောက်သည် အချက်အလက်)",
    title: "Customer",
    description:
      "Keep customer details organized, follow buying patterns, and build stronger relationships over time.",
  },
] as const;

const WorkspaePage = async () => {
  return (
    <section className="m-auto mt-10 w-full max-w-4xl p-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-umoe text-2xl">(မင်္ဂလာပါ)</span>
        <h1 className="font-margarine text-4xl">Hello Tinger!</h1>
        <p className="w-2/3 font-quicksand font-medium">
          This is your new creative playground. Explore, invent, and share your
          biggest ideas with us. Tingy is so excited for all the fun we'll have!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-margarine text-xl">My Workspace</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {WORKSPACE_LINKS.map((link) => (
            <NavigationLink
              key={link.title}
              href={link.href}
              variant={link.variant}
            >
              <div className="space-y-1">
                <span className="block font-umoe text-base text-white">
                  {link.labelMm}
                </span>
                <h2 className="font-chewy text-2xl text-white">{link.title}</h2>
              </div>

              <p className="line-clamp-2 font-quicksand text-sm font-medium text-white/75">
                {link.description}
              </p>
            </NavigationLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkspaePage;
