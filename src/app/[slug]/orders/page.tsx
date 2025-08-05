
import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPagesProps {
    searchParams: Promise<{ cpf: string }>
}


const OrderPage = async ({ searchParams }: OrdersPagesProps) => {
    const { cpf } = await searchParams
    if (!cpf) {
        return <CpfForm />
    }
    if (!isValidCpf(cpf)) {
        return <CpfForm />
    }
    const orders = await db.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            customerCpf: removeCpfPunctuation(cpf)
        },
        include: {
            Restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                },
            },
            orderProducts: {
                include: {
                    product: true,
                },
            },
        },
    })
    return <OrderList orders={orders} />
}

export default OrderPage;