import { useState } from "react";

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


function Logo() {
  return <div>
    <h1>🌴 Far Away 🧳</h1>
  </div>
}


function Form({OnAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handlesubmit(e) {
    e.preventDefault()
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() }
    console.log(newItem)
    OnAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return <form className="add-form" onSubmit={handlesubmit}>
    <h3> What do you need for your trip </h3>
    <select value={quantity}  onChange={(e)=> setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => <option value={num} key={num}>{ num}</option>)}
    </select>
    <input type="text" placeholder="Item...." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    <button> Add</button>
  </form>
}



function PackingList({ items, OnDeleteItem, togollecheckbox, clearPackingList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "packed") sortedItems = items.slice().sort((a,b)=> Number(b.packed) - Number(a.packed))
  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  

  return (
    <div className="list">
      <ul >
        {sortedItems.map(items => (<Items items={items} key={items.id} OnDeleteItem={OnDeleteItem} togollecheckbox={ togollecheckbox} />))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by Packed</option>
        </select>
        <button className="actions" onClick={() => {
          window.confirm("Are you sure you want to clear Packing List") && clearPackingList(items => [...items] = []);
        }}>Clear</button>
      </div>
    </div>
  );
}




function Items({ items, OnDeleteItem ,togollecheckbox}) {
  return (
    <li>
      <input type="checkbox" value={items.packed} onChange={()=> {togollecheckbox(items.id)}}/>
      <span style={items.packed ? {textDecoration:"line-through"}:{}}>{items.quantity} {items.description} </span>
    <button onClick={()=>OnDeleteItem(items.id)}>❌</button>
    </li>
  )
}




function Stats({ packedItems, noOfItems }) {
  const percentage = Math.round(packedItems * 100 / noOfItems);
    return (
    <footer className="stats">
        <em>
        {noOfItems === 0 ? "Start adding some items to your PackingList 👗👖" : percentage === 100 ? "You got everyThing ! Ready to Go..  ✈️✈️" : `🛍️  You have ${noOfItems} items in you list , and you alredy packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  )
}