import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  	items: [],
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload]
		},
		removeFromBasket: (state, action) => {
			const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);
			let newBasket = [...state.items];
			
			if(index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(`Cant remove product (id: ${action.payload.id}) as its not in the basket.`);
			}

			state.items = newBasket;
		},
		addQuantity: (state, action) => {
			const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);
			
			if(index >= 0) {
				state.items[index].quantity += 1;
			} else {
				console.warn(`Cant find product (id: ${action.payload.id}) as its not in the basket.`);
			}
		},
		minusQuantity: (state, action) => {
			const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);
			
			if(index >= 0) {
				state.items[index].quantity -= 1;
			} else {
				console.warn(`Cant find product (id: ${action.payload.id}) as its not in the basket.`);
			}
		}
	},
});

export const { addToBasket, removeFromBasket, addQuantity, minusQuantity } = basketSlice.actions;

export const selectItems = (state) => state.basket.items;

export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default basketSlice.reducer;