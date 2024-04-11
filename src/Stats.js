
export default function Stats({ packedItems, noOfItems }) {
    const percentage = Math.round(packedItems * 100 / noOfItems);
      return (
      <footer className="stats">
          <em>
          {noOfItems === 0 ? "Start adding some items to your PackingList 👗👖" : percentage === 100 ? "You got everyThing ! Ready to Go..  ✈️✈️" : `🛍️  You have ${noOfItems} items in you list , and you alredy packed ${packedItems} (${percentage}%)`}
        </em>
      </footer>
    )
  }