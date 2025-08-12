import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  projectType: z.string().min(2, "Project type is required"),
  location: z.string().min(2, "Location is required"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  requirements: z.string().min(10, "Please describe your requirements"),
});

type FormValues = z.infer<typeof schema>;

const ClientProjectForm = () => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      location: "",
      budget: "",
      timeline: "",
      requirements: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { error } = await supabase.from("project_submissions").insert({
        ...values,
        created_at: new Date().toISOString(),
        status: "new",
      });
      if (error) throw error;

      toast({
        title: "Project submitted",
        description:
          "Thanks! Our team will contact you shortly and match you with architects.",
      });
      form.reset();
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description:
          "We couldn't submit your project. Please try again in a moment.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Submit Your Project | DesignKonnect</title>
        <meta
          name="description"
          content="Submit your architecture project to DesignKonnect and get matched with top architects."
        />
        <link rel="canonical" href="/clients" />
      </Helmet>

      <section className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Submit Your Project
            </h1>
            <p className="mt-2 text-muted-foreground">
              Tell us about your project and we’ll connect you with the right
              architects.
            </p>
          </header>

          <div className="rounded-xl border border-border p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Include country/area code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Residential, Commercial" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City / Site address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget (optional)</FormLabel>
                        <FormDescription>Approximate total budget</FormDescription>
                        <FormControl>
                          <Input placeholder="e.g., ₹25–30L" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Start in June, finish by December" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project requirements</FormLabel>
                      <FormDescription>
                        Share goals, constraints, style preferences, and any key details.
                      </FormDescription>
                      <FormControl>
                        <Textarea rows={6} placeholder="Describe your project..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Submit project"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientProjectForm;
