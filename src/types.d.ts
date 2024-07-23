interface Transaction {
    id: string;
    type: string;
    amount: number;
    description: string;
    is_fixed: boolean;
    day_of_month: number;
    endDate: string;
    category: string;
}

interface CreateTransaction {
    userId: string;
    type: string;
    amount: number;
    description: string;
    is_fixed: boolean;
    day_of_month: number;
    endDate: string;
    category: string;
}

interface CreateCategory {
    userId: string;
    name: string;
    color: string;
    type: string;
}

interface Category {
    id?: string;
    userID?: string;
    name: string;
    color: string;
    type: string;
}


