"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { schema } from "@/utils/schemaContactForm";
import z from "zod";

type ContactFormData = z.infer<typeof schema>;

const ContactPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      await axios.post("/api/contact", data);
      setSuccessMessage("🎉 پیام شما با موفقیت ارسال شد!");
      reset();
    } catch (error) {
      setServerError("❌ خطایی در ارسال پیام رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <div className="flex items-center justify-center">
        <h1 className="lg:text-3xl">ارتباط با ما</h1>
      </div>

      <p className="text-center text-gray-700 text-xs lg:text-base">
        اگر پیشنهادی برای افزودن آهنگ جدید دارید، یا در پخش آنلاین به مشکلی
        برخوردید، خوشحال می‌شویم از شما بشنویم 🎧
      </p>

      {successMessage && (
        <p className="mb-4 text-green-400 text-center">{successMessage}</p>
      )}
      {serverError && (
        <p className="mb-4 text-red-400 text-center">{serverError}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 border border-gray-300 w-full max-w-3xl shadow-lg rounded-xl p-3 lg:p-6"
      >
        <div>
          <label className="block font-medium mb-1 text-sm lg:text-base">
            نام شما
          </label>
          <input
            {...register("name")}
            className={`w-full border rounded-lg px-4 py-2 text-[#242424] focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#08aadb]"
            }`}
          />
          {errors.name && (
            <p className="text-red-400 text-xs lg:text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1 text-sm lg:text-base">
            ایمیل
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full border rounded-lg px-4 py-2 text-[#242424] focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#08aadb]"
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs lg:text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1 text-sm lg:text-base">
            پیام
          </label>
          <textarea
            rows={5}
            {...register("message")}
            className={`w-full border text-xs lg:text-sm rounded-lg p-2 text-[#242424] focus:outline-none focus:ring-1 ${
              errors.message
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#08aadb]"
            }`}
            placeholder="پیام خود را اینجا بنویسید..."
          />
          {errors.message && (
            <p className="text-red-400 text-xs lg:text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg text-white transition duration-200
    ${
      isSubmitting
        ? "bg-indigo-400 cursor-not-allowed"
        : "bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
    }
  `}
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
