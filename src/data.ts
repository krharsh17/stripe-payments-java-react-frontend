import {ItemData} from "./components/CartItem.tsx";

export const Products: ItemData[] = [
    {
        description: "Premium Shoes",
        image: "https://source.unsplash.com/NUoPWImmjCU",
        name: "Puma Shoes",
        price: 20,
        quantity: 1,
        id: "shoe"
    },
    {
        description: "Comfortable everyday slippers",
        image: "https://source.unsplash.com/K_gIPI791Jo",
        name: "Nike Sliders",
        price: 10,
        quantity: 1,
        id: "slippers"
    },
]

export const Subscriptions: ItemData[] = [
    {
        description: "Enjoy uninterrupted music 24x7",
        image: "https://source.unsplash.com/QzpgqElvSiA",
        name: "Apple Music+",
        price: 4.99,
        quantity: 1,
        id: "music"
    }
]