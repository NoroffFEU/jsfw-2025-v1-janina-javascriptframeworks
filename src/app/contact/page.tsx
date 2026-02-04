"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { ContactErrors, ContactValues } from "@/utils/validation";
import { validateContact } from "@/utils/validation";

const initialValues: ContactValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name } = e.target;
    const nextErrors = validateContact(values);
    setErrors((prev) => ({ ...prev, [name]: nextErrors[name as keyof ContactValues] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    const hasErrors = Object.keys(nextErrors).length > 0;

    if (hasErrors) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    toast.success("Message sent!");
    setValues(initialValues);
    setErrors({});
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border rounded px-3 py-2"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border rounded px-3 py-2"
            placeholder="Subject"
          />
          {errors.subject && (
            <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            placeholder="Write your message..."
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">{errors.message}</p>
          )}
        </div>

        <button className="px-4 py-2 border rounded" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
