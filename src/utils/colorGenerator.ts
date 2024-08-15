export function randomColorGenerator() {
    const avatarColors = [
        "#0033A0", // Deep Blue
        "#DC143C", // Crimson Red
        "#228B22", // Forest Green
        "#FF8C00", // Dark Orange
        "#708090", // Slate Gray
        "#7851A9", // Royal Purple
        "#191970", // Midnight Blue
        "#800000", // Maroon
        "#008080", // Teal
        "#4682B4", // Steel Blue
        "#36454F", // Charcoal
        "#4B0082", // Indigo
        "#6B8E23", // Olive Drab
        "#483D8B", // Dark Slate Blue
        "#E30B5D", // Raspberry
    ];
    const idx = Math.floor(Math.random() * (1000 - 1) + 1);
    return avatarColors[idx % avatarColors.length];
}
