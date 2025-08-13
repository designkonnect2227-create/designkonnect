import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";

interface ArchitectProfileProps {
  architect: {
    slug: string;
    name: string;
    description: string;
    image: string;
  };
}

export default function ArchitectProfile({ architect }: ArchitectProfileProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);

    // Count how many layouts this user already requested
    const { count, error: countErr } = await supabase
      .from("layout_requests")
      .select("*", { count: "exact", head: true })
      .eq("email", data.email);

    if (countErr) {
      toast({ title: "Unable to process", description: countErr.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // First layout free
    const isFree = (count ?? 0) < 1;

    // Price calculation
    let price = 0;
    if (!isFree) {
      if (data.projectSize === "small") price = 500;
      else if (data.projectSize === "medium") price = 750;
      else if (data.projectSize === "large") price = 1000;
    }

    const { error } = await supabase.from("layout_requests").insert({
      architect_slug: architect.slug,
      architect_name: architect.name,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      project_size: data.projectSize,
      requirements: data.requirements,
      location: data.location,
      preferred_delivery: data.datetime,
      is_free: isFree,
      price_inr: price,
    });

    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "3D Layout request sent",
        description: isFree
          ? "This layout is free. We will deliver it via email."
          : `A ₹${price} fee applies for this layout based on your project size. We will share payment details on confirmation.`,
      });
      reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <img src={architect.image} alt={architect.name} className="w-full rounded-lg" />
      <h1 className="mt-4 text-3xl font-bold">{architect.name}</h1>
      <p className="text-muted-foreground">{architect.description}</p>

      {/* Card section with pricing & rules */}
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-800 font-medium">
          Rules & Charges:
        </p>
        <ul className="list-disc ml-5 mt-1 text-sm text-gray-700 space-y-1">
          <li>First 3D home layout is <strong>free</strong>.</li>
          <li>After the first layout, charges apply: ₹500 (small), ₹750 (medium), ₹1000 (large).</li>
          <li>Meeting duration: <strong>10 minutes</strong> only.</li>
          <li>3D layout will be delivered to your registered email.</li>
          <li>Please be prepared with your project details during the meeting</li>
        </ul>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">Request 3D Layout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request 3D Layout</DialogTitle>
            <DialogDescription>
              First 3D home layout is free. Afterwards ₹500–₹1000 per layout based on project size.
              Meeting is 10 minutes max, and your final layout will be emailed to you.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <input
                id="name"
                {...register("name", { required: true })}
                className="w-full h-10 border rounded px-3"
              />
              {errors.name && <p className="text-xs text-red-500">Name is required</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="w-full h-10 border rounded px-3"
              />
              {errors.email && <p className="text-xs text-red-500">Email is required</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full h-10 border rounded px-3"
              />
            </div>

            <div>
              <Label htmlFor="projectSize">Project Size</Label>
              <select
                id="projectSize"
                {...register("projectSize", { required: true })}
                className="w-full h-10 border rounded px-3"
              >
                <option value="">Select size</option>
                <option value="small">Small (up to 500 sq ft)</option>
                <option value="medium">Medium (500–1500 sq ft)</option>
                <option value="large">Large (1500+ sq ft)</option>
              </select>
              {errors.projectSize && <p className="text-xs text-red-500">Project size is required</p>}
            </div>

            <div>
              <Label htmlFor="location">Project Address / Site Location</Label>
              <input
                id="location"
                {...register("location", { required: true })}
                className="w-full h-10 border rounded px-3"
              />
              {errors.location && <p className="text-xs text-red-500">Location is required</p>}
            </div>

            <div>
              <Label htmlFor="datetime">Preferred Delivery Date</Label>
              <input
                id="datetime"
                type="date"
                {...register("datetime", { required: true })}
                className="w-full h-10 border rounded px-3"
              />
              {errors.datetime && <p className="text-xs text-red-500">Delivery date is required</p>}
            </div>

            <div>
              <Label htmlFor="requirements">Requirements / Notes</Label>
              <textarea
                id="requirements"
                {...register("requirements")}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Submit Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
