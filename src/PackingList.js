import { useState } from "react";

export default function PackingList({ items, OnDeleteItem, togollecheckbox, clearPackingList }) {
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