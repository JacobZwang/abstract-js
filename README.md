## What is Abstract JS?
> This project is still in early stage brainstorming. Feedback is welcome in issues.

Abstract JS is a JavaScript framework where UI is a side effect of your code, not the result. UI side effects can be used both in your application UI and inside your editor.

```tsx
let name = "world";
$: <h1>Hello {name}!</h1>
```

```tsx
let count = 0;
$: <button on:click={() => count++}>{count}</button>
```

```tsx
function getColor(color: string) {
    /* This function has a UI side effect that displays a color picker. It binds the color picker to the color parameter and thus when used in your editor, it will update the color passed to the function in your code accordingly. At runtime, when a parameter is changed, the function will be rerun.*/
    $: <input type="color" bind:value={color} />;
    return color;
}

let color = getColor("#aaffee"); // hover over getColor to use it's UI side effect (a color picker) in your editor.
$: {
    <body>
        {/* You can also use `color`'s UI side effect in other UI by prefixing it with $. */}
        <$color />

        {/* Since `color` itself is just a normal (reactive) variable, you can use in your UI.*/}
        <p style:color={color}>{color}</p>

        {/* Or you can use getColor as a component directly by defining it's variable name inline using `let:variableName`. */}
        <$getColor let:colorTwo />
        {/* You can reference the variable name inside the scope of the component't slot (and maybe from it's siblings as well? tbd) */}
    </body>
}
```

```tsx
// You can use a reference to a function's UI side effect in a type def to allow editing that parameter using UI.
const contain = (backgroundColor: $getColor) => {
    $: {
        <div style={{ backgroundColor: backgroundColor }}>
            <slot />
        </div>;
    }
};

contain("#ffffff") // UI shows up on hover of parameter without needing to wrap it in getColor().
```

### Use Cases

```tsx
// Use UI in development for creating an easing animation. UI would bind to the parameter.
<h1 transition:slide={{easing: createEasing("cubic-bezier(0.25, 0.1, 0.25, 1.0)")}}>
    Visual CSS Bezier Curve Editor
</h1>
```

```tsx
// Use UI in development to build css grid template areas.
<div style:grid-template-areas={createGridTemplateAreas("\"head head\" \"nav  main\" \"nav foot\";")}>
    ...
</div>
```

```tsx
// Use UI in development to visualize trig functions and choose the one you need.
Math[pickTrigFunction("cos")](0);
```
