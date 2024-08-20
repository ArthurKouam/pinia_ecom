import { defineStore } from "pinia";
import { groupBy } from 'lodash'

export const  useCartStore = defineStore("CartStore", {

    state: ()=>{
        return{
            items: [],
        }
    },

    getters: {
        cartLength: (state) => state.items.length,
        groupped: (state) => groupBy(state.items, item => item.name),
        isEmpty: (state) => state.cartLength === 0,
        total: state => state.items.reduce((p, c) => p+c.price, 0)
    },

    actions: {
        AddItems(count, item){
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push(item);
            }
        },

        clearItem(ItemName){
            this.items = this.items.filter(item => item.name != ItemName);
        },

        Update(count, Itemname, item){
            this.items = this.items.filter(item => item.name != Itemname);
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push(item);
            }
        }
    },

})