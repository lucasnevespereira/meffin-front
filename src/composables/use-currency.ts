import { computed } from "vue";
import { useUserStore } from "@/store/user";
import { Currency } from "@/enum";

export function useCurrency() {
  const userStore = useUserStore();

  const currency = computed(() => userStore.getCurrency());
  const isUpdatingCurrency = computed(() => userStore.getIsUpdatingCurrency());

  const getCurrencySymbol = (currencyCode?: string) => {
    const code = currencyCode || currency.value;
    const symbols: Record<string, string> = {
      EUR: "€",
      USD: "$",
      GBP: "£",
      CAD: "C$",
      AUD: "A$",
      CHF: "CHF",
      JPY: "¥",
    };
    return symbols[code] || code;
  };

  const formatAmount = (amount: number | string, currencyCode?: string) => {
    const code = currencyCode || currency.value;
    const symbol = getCurrencySymbol(code);
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

    // Format number with proper decimal places
    const formattedAmount = numAmount.toFixed(2);
    return `${formattedAmount} ${symbol}`;
  };

  const updateCurrency = async (newCurrency: Currency) => {
    return await userStore.updateCurrency(newCurrency);
  };

  return {
    currency,
    isUpdatingCurrency,
    getCurrencySymbol,
    formatAmount,
    updateCurrency,
  };
}
