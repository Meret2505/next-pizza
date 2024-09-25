import { axiosInstance } from "./axios"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto"

export const fetchCart = async (): Promise<CartDTO> => {
    const { data } = await axiosInstance.get<CartDTO>('/cart')
    return data
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.patch<CartDTO>(`/cart/${id}`, { quantity })
    return data
}


export const deleteCartItem = async (id: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.delete<CartDTO>(`/cart/${id}`)
    return data
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    const { data } = await axiosInstance.post<CartDTO>('/cart', values)
    return data
}