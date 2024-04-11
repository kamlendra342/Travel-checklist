import { useState } from "react";

import Logo from "./logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Belt", quantity: 2, packed: true },
];
export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleItemsAdd(newitem) {
    setItems(item => [...item, newitem]);
  };
  function deleteItem(id) {
    setItems(item => [...item].filter(el => el.id !== id));
  }
  function togollecheckbox(id) {
    setItems(items => items.map((item) => 
  item.id === id ? {...item,packed: !item.packed} : item))
  }
  const noOfItems = items.length
  const packedItems = [...items].reduce((acc, cur) => {
    cur.packed === true && acc++;
    return acc;
  }, 0);
  
  return (
    <div>
      <Logo />
      <Form OnAddItems={handleItemsAdd} />
      <PackingList items={items} OnDeleteItem={deleteItem} togollecheckbox={togollecheckbox} clearPackingList={setItems} />
      <Stats noOfItems={noOfItems} packedItems={packedItems} />
    </div>
  );
}