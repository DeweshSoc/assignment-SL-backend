export function randomColorGenerator() {
    const colors = ["6497b1", "fe8a71", "83d0c9", "7bc043", "ee4035", "F8A01D"];
    const idx = Math.floor(Math.random() * (1000 - 1) + 1);
    return colors[idx % colors.length];
}
