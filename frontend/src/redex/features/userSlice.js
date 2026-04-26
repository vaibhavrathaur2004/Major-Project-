import { createSlice, current } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        currentCity:null,
        shopInCity:null,
        cartItems:[],
    },
    reducers:{
        setUserData :(state,action)=>{
            state.userData = action.payload
        },
        setCurrentcity :(state,action)=>{
            state.currentCity = action.payload
        }, 
        setShopInCity :(state,action)=>{
            state.shopInCity = action.payload
        },
        addToCart:(state,action)=>{
            const item = action.payload

            const existingItem = state.cartItems  .find((i) => i.id === item.id);
            if(existingItem){
                existingItem.quantity += 1
            }else{
                state.cartItems.push({...item,quantity:1})
            }
            //console.log("cartitems",state.cartItems);
            
        },
        
        
        removeFromCart:(state,action)=>{
            const id = action.payload 
            state.cartItems= state.cartItems.filter((item) => item.id !== id)
        },

        decreaseQuantity:(state,action)=>{
            const id = action.payload
            const existingItem =state.cartItems.find((item)=> item.id == id)
            if(existingItem){
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                }else{
                    state.cartItems= state.cartItems.filter((item) => item.id !== id)
                }
            }

        }
    }
})

export  const {setUserData,setCurrentcity,setShopInCity,addToCart,removeFromCart ,decreaseQuantity} = userSlice.actions;
export default userSlice.reducer;
