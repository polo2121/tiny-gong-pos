// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import DualText from "@/components/DualText";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   productRegistrationSchema,
//   ProductRegistrationValues,
//   productVariantRegistrationSchema,
//   ProductVariantRegistrationValues,
// } from "@/features/products/schema/product-variant-registration.schema";

// type SavedVariant = ProductVariantRegistrationValues & {
//   id: number;
// };

// type RegistrationStep = "idle" | "productForm" | "variantForm" | "review";

// const ProductRegistrationSection = () => {
//   const [step, setStep] = useState<RegistrationStep>("idle");
//   const [isFinalizing, setIsFinalizing] = useState(false);
//   const [savedProduct, setSavedProduct] =
//     useState<ProductRegistrationValues | null>(null);
//   const [savedVariants, setSavedVariants] = useState<SavedVariant[]>([]);

//   const productForm = useForm<ProductRegistrationValues>({
//     resolver: zodResolver(productRegistrationSchema),
//     defaultValues: {
//       productName: "",
//       productSeriesCode: "",
//       categoryName: "",
//       price: 0,
//       cost: 0,
//     },
//   });

//   const variantForm = useForm<ProductVariantRegistrationValues>({
//     resolver: zodResolver(productVariantRegistrationSchema),
//     defaultValues: {
//       color: "",
//       size: "",
//       gender: "",
//       stock: 0,
//     },
//   });

//   const handleProductSubmit = (values: ProductRegistrationValues) => {
//     setSavedProduct(values);
//     setStep("review");
//   };

//   const handleVariantSubmit = (values: ProductVariantRegistrationValues) => {
//     setSavedVariants((currentVariants) => [
//       ...currentVariants,
//       {
//         id: currentVariants.length + 1,
//         ...values,
//       },
//     ]);
//     variantForm.reset();
//     setStep("review");
//   };

//   const canFinalize = Boolean(savedProduct) && savedVariants.length > 0;

//   const handleFinalizeRegistration = async () => {
//     if (isFinalizing) return;
//     if (!savedProduct || savedVariants.length === 0) return;

//     setIsFinalizing(true);

//     try {
//       // TODO: Replace this with a real server call.
//       await new Promise((resolve) => setTimeout(resolve, 700));

//       toast.success("Product registration submitted.");
//       setSavedProduct(null);
//       setSavedVariants([]);
//       productForm.reset();
//       variantForm.reset();
//       setStep("idle");
//     } catch {
//       toast.error("Failed to submit registration. Please try again.");
//     } finally {
//       setIsFinalizing(false);
//     }
//   };

//   return (
//     <section className="space-y-6">
//       <Card className="border-slate-200 bg-white shadow-sm">
//         <CardContent className="space-y-6 py-5">
//           <div className="space-y-2">
//             <DualText
//               primary="Register Product"
//               secondary="ကုန်ပစ္စည်းအသစ် မှတ်တမ်းတင်ရန်"
//               size="lg"
//             />
//             <p className="text-sm text-slate-500">
//               Create the product first. Variant creation unlocks only after the
//               product details are saved.
//             </p>
//           </div>

//           {!savedProduct && step === "idle" ? (
//             <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
//               <Button
//                 onClick={() => setStep("productForm")}
//                 disabled={isFinalizing}
//               >
//                 Create Product
//               </Button>
//             </div>
//           ) : null}

//           {step === "productForm" ? (
//             <form
//               className="space-y-5"
//               onSubmit={productForm.handleSubmit(handleProductSubmit)}
//             >
//               <div className="grid gap-4 md:grid-cols-2">
//                 <Field label="Product Name">
//                   <Input
//                     {...productForm.register("productName")}
//                     placeholder="Enter product name"
//                   />
//                   <FieldError
//                     message={productForm.formState.errors.productName?.message}
//                   />
//                 </Field>

//                 <Field label="Series Code">
//                   <Input
//                     {...productForm.register("productSeriesCode")}
//                     placeholder="Enter series code"
//                   />
//                   <FieldError
//                     message={
//                       productForm.formState.errors.productSeriesCode?.message
//                     }
//                   />
//                 </Field>

//                 <Field label="Category">
//                   <Controller
//                     control={productForm.control}
//                     name="categoryName"
//                     render={({ field }) => (
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Dresses">Dresses</SelectItem>
//                           <SelectItem value="Tops">Tops</SelectItem>
//                           <SelectItem value="Bottoms">Bottoms</SelectItem>
//                           <SelectItem value="Sets">Sets</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                   <FieldError
//                     message={productForm.formState.errors.categoryName?.message}
//                   />
//                 </Field>

//                 <Field label="Price">
//                   <Input
//                     type="number"
//                     min="0"
//                     {...productForm.register("price", { valueAsNumber: true })}
//                     placeholder="Enter selling price"
//                   />
//                   <FieldError
//                     message={productForm.formState.errors.price?.message}
//                   />
//                 </Field>

//                 <Field label="Cost">
//                   <Input
//                     type="number"
//                     min="0"
//                     {...productForm.register("cost", { valueAsNumber: true })}
//                     placeholder="Enter cost"
//                   />
//                   <FieldError
//                     message={productForm.formState.errors.cost?.message}
//                   />
//                 </Field>
//               </div>

//               <div className="flex items-center justify-end gap-3">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   disabled={isFinalizing}
//                   onClick={() => {
//                     productForm.reset(savedProduct ?? undefined);
//                     setStep(savedProduct ? "review" : "idle");
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" disabled={isFinalizing}>
//                   {savedProduct ? "Update Product" : "Save Product"}
//                 </Button>
//               </div>
//             </form>
//           ) : null}

//           {savedProduct ? (
//             <div className="space-y-5">
//               <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
//                 <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
//                   <div className="space-y-1">
//                     <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
//                       Product Ready
//                     </p>
//                     <h3 className="text-lg font-semibold text-slate-900">
//                       {savedProduct.productName}
//                     </h3>
//                     <p className="text-sm text-slate-500">
//                       {savedProduct.productSeriesCode} ·{" "}
//                       {savedProduct.categoryName}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       disabled={isFinalizing}
//                       onClick={() => {
//                         productForm.reset(savedProduct);
//                         setStep("productForm");
//                       }}
//                     >
//                       Edit Product
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       disabled={isFinalizing}
//                       onClick={() => {
//                         setSavedProduct(null);
//                         setSavedVariants([]);
//                         productForm.reset();
//                         variantForm.reset();
//                         setStep("idle");
//                       }}
//                     >
//                       Remove Product
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="mt-4 grid gap-3 sm:grid-cols-2">
//                   <SummaryItem
//                     label="Price"
//                     value={String(savedProduct.price || "-")}
//                   />
//                   <SummaryItem
//                     label="Cost"
//                     value={String(savedProduct.cost || "-")}
//                   />
//                 </div>
//               </div>

//               {step !== "variantForm" ? (
//                 <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6">
//                   <Button
//                     onClick={() => setStep("variantForm")}
//                     disabled={isFinalizing}
//                   >
//                     Create Variant
//                   </Button>
//                 </div>
//               ) : null}

//               {step === "variantForm" ? (
//                 <form
//                   className="space-y-5"
//                   onSubmit={variantForm.handleSubmit(handleVariantSubmit)}
//                 >
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <Field label="Color">
//                       <Input
//                         {...variantForm.register("color")}
//                         placeholder="Enter color"
//                       />
//                       <FieldError
//                         message={variantForm.formState.errors.color?.message}
//                       />
//                     </Field>

//                     <Field label="Size">
//                       <Input
//                         {...variantForm.register("size")}
//                         placeholder="Enter size"
//                       />
//                       <FieldError
//                         message={variantForm.formState.errors.size?.message}
//                       />
//                     </Field>

//                     <Field label="Gender">
//                       <Controller
//                         control={variantForm.control}
//                         name="gender"
//                         render={({ field }) => (
//                           <Select
//                             value={field.value}
//                             onValueChange={field.onChange}
//                           >
//                             <SelectTrigger className="w-full">
//                               <SelectValue placeholder="Select gender" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="Boy">Boy</SelectItem>
//                               <SelectItem value="Girl">Girl</SelectItem>
//                               <SelectItem value="Unisex">Unisex</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         )}
//                       />
//                       <FieldError
//                         message={variantForm.formState.errors.gender?.message}
//                       />
//                     </Field>

//                     <Field label="Stock">
//                       <Input
//                         type="number"
//                         min="0"
//                         {...variantForm.register("stock", {
//                           valueAsNumber: true,
//                         })}
//                         placeholder="Enter stock quantity"
//                       />
//                       <FieldError
//                         message={variantForm.formState.errors.stock?.message}
//                       />
//                     </Field>
//                   </div>

//                   <div className="flex items-center justify-end gap-3">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       disabled={isFinalizing}
//                       onClick={() => {
//                         variantForm.reset();
//                         setStep("review");
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                     <Button type="submit" disabled={isFinalizing}>
//                       Save Variant
//                     </Button>
//                   </div>
//                 </form>
//               ) : null}

//               {step === "review" ? (
//                 <div className="flex items-center justify-end gap-3">
//                   <Button
//                     type="button"
//                     disabled={!canFinalize || isFinalizing}
//                     onClick={handleFinalizeRegistration}
//                   >
//                     {isFinalizing
//                       ? "Submitting..."
//                       : "Submit Registration to Server"}
//                   </Button>
//                 </div>
//               ) : null}

//               {savedVariants.length > 0 ? (
//                 <div className="space-y-3">
//                   <DualText
//                     primary="Saved Variants"
//                     secondary="မှတ်တမ်းတင်ပြီးသော အမျိုးအစားခွဲများ"
//                     size="md"
//                   />

//                   <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
//                     {savedVariants.map((variant) => (
//                       <Card
//                         key={variant.id}
//                         className="border-slate-200 bg-white shadow-sm"
//                       >
//                         <CardContent className="space-y-2 py-4">
//                           <p className="text-sm font-semibold text-slate-900">
//                             {variant.color}
//                           </p>
//                           <p className="text-sm text-slate-500">
//                             {variant.size} · {variant.gender}
//                           </p>
//                           <p className="text-sm text-slate-500">
//                             Stock: {variant.stock}
//                           </p>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           ) : null}
//         </CardContent>
//       </Card>
//     </section>
//   );
// };

// type FieldProps = {
//   label: string;
//   children: React.ReactNode;
// };

// const Field = ({ label, children }: FieldProps) => {
//   return (
//     <div className="space-y-2">
//       <label className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// };

// type SummaryItemProps = {
//   label: string;
//   value: string;
// };

// const SummaryItem = ({ label, value }: SummaryItemProps) => {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
//       <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
//         {label}
//       </p>
//       <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
//     </div>
//   );
// };

// type FieldErrorProps = {
//   message?: string;
// };

// const FieldError = ({ message }: FieldErrorProps) => {
//   if (!message) {
//     return null;
//   }

//   return <p className="text-xs text-red-500">{message}</p>;
// };

// export default ProductRegistrationSection;
