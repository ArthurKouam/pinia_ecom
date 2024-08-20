<script setup>
// imports
import { ref } from "vue";
import CartItem from "./CartItem.vue";
import { useCartStore } from "@/stores/CartStore";
const CartStore = useCartStore();

// data
const active = ref(false);

</script>
<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{ CartStore.cartLength }}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="(!CartStore.isEmpty)">
        <ul class="items-in-cart">
          <CartItem
            v-for="(items, name) in CartStore.groupped"
            :product="items[0]"
            :count="items.length"
            :key="name"
            @updateCount="CartStore.Update($event, name, items[0])"
            @clear="CartStore.clearItem(name)"
          />
          
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong> ${{ CartStore.total }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2">Clear Cart</AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>

      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
  </div>
</template>
<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
