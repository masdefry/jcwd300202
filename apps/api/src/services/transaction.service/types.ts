export interface ITransaction {
    checkInDate: Date,
    checkOutDate: Date,
    total: number,
    price: number,
    qty: number,
    adult: number,
    children: number,
    tenantId: string,  
    propertyId: string,
    roomId: number,
    userId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ITransactionStatus {
    id: number,
    status: Status,
    transactionId: string

    createdAt?: Date,
    updatedAt?: Date
}

export enum Status {
    WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
    WAITING_FOR_CONFIRMATION_PAYMENT = "WAITING_FOR_CONFIRMATION_PAYMENT",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}