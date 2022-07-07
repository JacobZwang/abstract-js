// let value = 6;
// A: <input bind:value={test} />;

// const Color = (color: string, $ = <input type="color" bind:value={color} />) =>
//   color;

// type $<T, _UI extends ($) => HTMLElement> = T;
// type _<T extends (_) => HTMLElement> = Parameters<T>[0];

// _: const Color = (_: string) => <input type="color" bind:value={_} />;

function getColor() {
    let color: string = "";
    $: <input type="color" bind:value={color} />; // define the UI of a function as a side effect

    return color;
}

// define a function that uses another function as it's parameter
function createApp(color: getColor) {
    $: {
        <body>
            {/* use the UI of a the getColor function in this functions UI */}
            <$color />
            <div backgroundColor={color}>{color}</div>;
        </body>;
    }
}

export default function render() {
    // hover over the parameter to use the getColor UI during dev
    const app = createApp("#ffffff");
    $: <$app />;
}

type getColor = ReturnType<typeof getColor>;

// function setBackgroundColor(color: Dev<typeof Color>) {
//   document.body.style.backgroundColor = color;
// }

// type Dev<T extends (...args: any[]) => any> = ReturnType<T>;

// function setBackgroundColor(color: Color) {
//   document.body.style.backgroundColor = color;
// }

// generated
// type Color = Parameters<typeof Color>[0];
