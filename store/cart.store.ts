import { CartCustomization, CartItemType, CartStore } from "@/type";
import { create } from "zustand";

function areCustomizationsEqual(
  a: CartCustomization[],
  b: CartCustomization[],
): boolean {
  if (a.length !== b.length) return false;

  const aSorted = [...a].sort((x, y) => x.id.localeCompare(y.id));
  const bSorted = [...b].sort((x, y) => x.id.localeCompare(y.id));

  return aSorted.every((item, index) => item.id === bSorted[index].id);
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item: Omit<CartItemType, "quantity">) => {
    const customizations = item.customizations ?? [];

    const existing = get().items.find(
      (i) =>
        i.id === item.id &&
        areCustomizationsEqual(i.customizations ?? [], customizations),
    );

    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === item.id &&
          areCustomizationsEqual(
            i.customizations ?? [],
            item.customizations ?? [],
          )
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      });
    } else {
      set({
        items: [...get().items, { ...item, quantity: 1, customizations }],
      });
    }
  },

  removeItem: (id, customizations = []) => {
    set({
      items: get().items.filter(
        (i) =>
          !(
            i.id === id &&
            areCustomizationsEqual(i.customizations ?? [], customizations)
          ),
      ),
    });
  },

  increaseQty: (id, customizations = []) => {
    set({
      items: get().items.map((i) =>
        i.id === id && areCustomizationsEqual(i.customizations, customizations)
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      ),
    });
  },

  decreaseQty: (id, customizations = []) => {
    set({
      items: get().items.map((i) =>
        i.id === id && areCustomizationsEqual(i.customizations, customizations)
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => get().items.length,

  getTotalPrice: () =>
    get().items.reduce((total, item) => {
      const base = item.price;
      const customPrice =
        item.customizations.reduce(
          (s: number, c: CartCustomization) => s + c.price,
          0,
        ) ?? 0;

      return total + item.quantity * (base + customPrice);
    }, 0),
}));
