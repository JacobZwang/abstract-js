const getColor = (color: string = "#ffffff") => {
    $: <input type="color" bind:value={color} />;

    return color;
};

const contain = (backgroundColor: $getColor) => {
    $: {
        <div style={{ backgroundColor: backgroundColor }}>
            <slot />
        </div>;
    }
};

const main = () => {
    let color = getColor();

    setTimeout(() => {
        color = getColor();
    }, 1000);

    $: {
        <$contain as:container backgroundColor={color}>
            <$color />
        </$contain>;
    }
};
