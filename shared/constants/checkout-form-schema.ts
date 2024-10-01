import { z } from 'zod'

export const CheckoutFormSchema = z.object({
    firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
    lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
    email: z.string().email({ message: 'Некорректный email адрес' }),
    phone: z.string().min(10, { message: 'Номер телефона должен содержать не менее 10 символов' }),
    address: z.string().min(5, { message: 'Некорректный aдрес' }),
    comment: z.string().optional(),
})


export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>