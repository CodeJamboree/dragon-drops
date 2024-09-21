# Dragon Drops

This is a small helper utility built on top of React-DnD to
encapsulate some of the logic involved in setting up Drag &
Drop functionality.

# Drag & Drop Provider

Components must be in a Drag & Drop provider in order to
allow Drag & Drop operations. Ideally, you can set this at
a high level of your application in one place.

```js
<DragAndDropProvider>
  <App />
</DragAndDropProvider>
```

# Drag

To make a component draggable, wrap it in the Draggable
component.

```js
const onDragCancel = (draggedItem) => {
  console.log(draggedItem);
  // { id: 1, index: 3}
};
const onDrop = (draggedItem, dropResult) => {
  console.log(draggedItem);
  // { id: 1, index: 3}
  console.log(dropResult);
  // { id: 4, index: 8, position: "before"}
};

<Draggable 
  type="MyButton" 
  item={{id: 1, index: 3}}
  onDragCancel={onDragCancel}
  onDrop={onDrop}
  >
  <MyDraggableContent>
</Draggable>
```
- type: The type of data being dragged
- item.id: identity of the component in your data source
- item.index: current index within a list
- onDrop: called when a component is let go, even if it was canceled
- onDragCancel: called when the item is dropped on an invalid target 

The draggable content needs to make use of the `useDraggable` hook.
```js
export const MyDraggableContent = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { drag, preview, isDragging } = useDraggable();

  drag(ref);

  return ( 
    <div ref={ref}>
      <button ref={preview} disabled={isDragging}>Drag Me</button>
    </div>
  );
}
```
# Drop

To make a component accept items to be dropped on it, wrap it within Droppable

```js
const onDraggedOver = (draggedItem, dropResult) => {
  console.log(draggedItem);
  // { id: 1, index: 3}
  console.log(dropResult);
  // { id: 4, index: 8, position: "before"}
};

<Droppable
  accept="MyButton" 
  item={{ id: 4, index: 8 }}
  onDraggedOver={onDraggedOver}
  >
  <MyDroppableContent>
</Droppable>
```

- accept: The type of data that may be dropped
- item.id: identity of the component in your data source
- item.index: current index within a list
- onDraggedOver: called when a component is hovering

The drop target needs to make use of the `useDroppable` 
hook.

```js
export const MyDroppableContent = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { drop, setRef, handlerId } = useDroppable();

  useEffect(() => setRef(ref), [ref, setRef]);

  drop(ref);

  return ( 
    <div ref={ref} data-handler-id={handlerId}>
      <button>Drop Over Me</button>
    </div>
  );
}
```

# Drag & Drop

A component can be both draggable and be a drop target.

```js
const item = { id: 1, index: 3 };
<Draggable 
  type="MyButton" 
  item={item}
  onDragCancel={onDragCancel}
  onDrop={onDrop}
  >
  <Droppable
    accept="MyButton" 
    item={item}
    onDraggedOver={onDraggedOver}
    >
    <MyDragAndDropContent>
  </Droppable>
</Draggable>
```
And the content...
```js

export const MyDragAndDropContent = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { drag, preview, isDragging } = useDraggable();
  const { drop, setRef, handlerId } = useDroppable();

  useEffect(() => setRef(ref), [ref, setRef]);

  drag(drop(ref));

  return ( 
    <div ref={ref} data-handler-id={handlerId}>
      <button ref={preview} disabled={isDragging}>
        Drag Me or Drop Over Me
      </button>
    </div>
  );
}
```
# Ordered List

The ordered list maintains a copy of items that may be drag 
& dropped into a new order, and raised an event to apply the 
changes.

```js
const onChanged = (changes) => {
  console.log(changes);
  // [ 
  //   {id: 1, order: 6}, 
  //   {id: 4, order: 9}
  // ]
}
<Orderable 
  items={items}
  canMove={!isSaving}
  onChanged={onChanged}>
  <MyOrderedList>
</Orderable>
```

- items: An array of items that may be drag & dropped
- canMove: indicates if hover & drop operations are disabled
- onChanged: called after a drop operation, with only the
id and order of the items that have changed. Order is 1-based.

The `useOrdered` hook provides a copy of the items that may 
be drag & dropped.

```js

export const MyOrderedList = () => {

  const {items, onDraggedOver onDragCancel, onDrop} = 
    useOrderable<MyItemType>();

  return <ul>
    {items.map((item, index) => (
      <Draggable
        key={id}
        type="MyButton"
        onDragCancel={onDragCancel}
        onDrop={onDrop}
        item={item}
      >
        <Droppable
          accept="MyButton"
          item={item}
          onDraggedOver={onDraggedOver}>
          <li>
            <MyDragAndDropContent item={item}>
          </li>
        </Droppable>
      </Draggable>
    ))}
  </ul>
};
```