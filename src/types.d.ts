interface Transaction {
    id: string;
    type: string;
    amount: number;
    description: string;
    is_fixed: boolean;
    day_of_month: number;
    endDate: string;
}

interface CreateTransaction {
    userId: string;
    type: string;
    amount: number;
    description: string;
    is_fixed: boolean;
    day_of_month: number;
    endDate: string;
}