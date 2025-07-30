import z from "zod";

export const schema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  email: z.string().email("ایمیل وارد شده معتبر نیست"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ حرف داشته باشد"),
});
