"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { email } from "@/lib/data";
import { Linkedin, Mail, Phone } from "lucide-react";
import Navbar from "@/components/main/nav-bar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GlowBg, GlowButton } from "@/components/motion-primitives/glow";
import { useCurrentProfile } from "@/lib/store/useProfileStore";
import { getCurrentExperience, getLatestEducation } from "@/lib/utils";
import { useEducation } from "@/hooks/useEducation";
import { useExperiences } from "@/hooks/useExperience";
import { ContactFormSchema, contactFormSchema } from "@/types/contactSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { sendContactEmailAction } from "@/actions/email/sendEmail";

interface ContactDetails {
  subject?: string;
  name: string;
  message: string;
  email: string;
  phone: string;
}

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const currentProfile = useCurrentProfile();

  const { allEducation } = useEducation();
  const { experiences } = useExperiences();

  // Get the latest education
  const latestEducation = getLatestEducation(allEducation);

  // Get the most current experience
  const currentExperience = getCurrentExperience(experiences);

  const onSubmit = async (values: ContactFormSchema) => {
    setLoading(true);
    try {
      const response = await sendContactEmailAction(values);

      if (!response.success) {
        console.error(response.error || "Unknown error");
        toast.error("Failed to send message", {
          description:
            typeof response.issues === "object"
              ? "Please check the form fields."
              : response.error,
        });
        return;
      }

      toast.success("Email Sent", {
        description: "An email has been sent. You should get a response soon.",
      });

      form.reset();
    } catch (err: any) {
      toast.error("Something went wrong", {
        description: err.message ?? "Unexpected error occurred.",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/in/victoria-ajuwon/");
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pb-20 pt-20 px-4 md:px-10 max-w-7xl mx-auto mt-10">
        <h1 className="text-white text-3xl md:text-5xl mt-4 mb-12 text-center font-bold">
          Contact
        </h1>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Details */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <GlowBg className="w-full max-w-xl">
              <Card className="w-full max-w-xl rounded-[10px] bg-zinc-900 border border-zinc-800 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                <CardContent className="p-8 flex flex-col items-center">
                  <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-700 shrink-0">
                      <Image
                        src="https://res.cloudinary.com/dixwarqdb/image/upload/v1743898428/bljzj2qgztwy5htqc9px.jpg"
                        alt="Profile photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                      <h2 className="text-white text-2xl md:text-3xl font-bold">
                        Victoria Ajuwon
                      </h2>
                      <p className="text-zinc-400 text-lg md:text-xl mt-1">
                        {currentProfile?.name || "Developer"}
                      </p>
                      <p className="text-zinc-300 text-sm md:text-base mt-4 leading-relaxed">
                        {currentProfile?.details?.summary || ""}
                      </p>
                      <p className="text-zinc-400 text-sm mt-3">
                        {currentExperience?.company} | {latestEducation?.degree}
                        {" ,"} {latestEducation?.institution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 w-full flex justify-center">
                    <button
                      type="button"
                      onClick={handleLinkedIn}
                      className="flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded-[8px] hover:bg-[#0369a1] transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="font-medium">View Profile</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </GlowBg>
          </div>

          {/* Form */}
          <GlowBg className="w-full md:w-1/2 h-[95vh]">
            <Card className="w-full rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">
                  Contact Form
                </CardTitle>
                <p className="text-gray-300 text-center mt-2">
                  You can send me a direct email via the form
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Subject */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Topic of Interest"
                              type="text"
                              {...field}
                              value={field.value ?? ""}
                              className="text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Doe"
                              type="text"
                              {...field}
                              value={field.value ?? ""}
                              className="text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="jane.doe@example.com"
                              type="email"
                              {...field}
                              value={field.value ?? ""}
                              className="text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 (123)-456-7890"
                              type="text"
                              {...field}
                              value={field.value ?? ""}
                              className="text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              id="notes"
                              placeholder="What you want to ask..."
                              className="resize-none text-white"
                              rows={5}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </GlowBg>
        </div>

        {/* Reach out */}
        <div>
          <p className="text-white text-xl text-center my-8">
            I&apos;m always up for a chat or a coffee! Feel free to reach out.
          </p>

          {/* Contact Details */}
          <div className="flex items-center justify-between gap-4">
            <GlowButton className="w-full">
              <div className="flex items-center gap-4 bg-zinc-900 rounded-full px-6 py-4 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:border-red-500 group cursor-pointer">
                <div className="bg-zinc-800 rounded-full p-2">
                  <Mail className="text-red-500 w-6 h-6" />
                </div>
                <span className="text-white text-lg">
                  victoria.ajuwon0@gmail.com
                </span>
              </div>
            </GlowButton>

            <GlowButton className="w-full">
              <div className="flex items-center gap-4 bg-zinc-900 rounded-full px-6 py-4 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:border-red-500 group cursor-pointer">
                <div className="bg-zinc-800 rounded-full p-2">
                  <Phone className="text-red-500 w-6 h-6" />
                </div>
                <span className="text-white text-lg">+1 647 321 9484</span>
              </div>
            </GlowButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
