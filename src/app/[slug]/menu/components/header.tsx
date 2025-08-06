"use client"
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, "name" | "coverImageUrl">
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter()
    const handleBackClick = () => router.back()
    const handleOrdersClick = () => router.push(`/${slug}/orders`);
    return (

        <div className="relative h-[250px] w-full">
            <Button variant="secondary" size="icon" className="absolute top-4 left-4 z-50 rounded-full"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />

            </Button>
            <Image
                src={restaurant.coverImageUrl}
                alt={restaurant.name}
                fill
                className="object-cover"
            />
            <Button onClick={handleOrdersClick}
                variant="secondary" size="icon" className="absolute top-4 right-4 z-50 rounded-full">
                <ScrollTextIcon />

            </Button>
        </div >
    );
}

export default RestaurantHeader;