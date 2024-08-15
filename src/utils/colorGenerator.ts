export function randomColorGenerator() {
    const colors = [
  "#FF0000", "#FF7F00", "#FFFF00", "#7FFF00", "#00FF00", "#00FF7F", "#00FFFF", "#007FFF", "#0000FF", "#7F00FF",
  "#FF00FF", "#FF007F", "#FF6F00", "#FFA500", "#FFD700", "#ADFF2F", "#32CD32", "#00FA9A", "#00CED1", "#1E90FF",
  "#8A2BE2", "#D2691E", "#FF4500", "#FF6347", "#FF1493", "#FF69B4", "#C71585", "#DC143C", "#B22222", "#A52A2A",
  "#DAA520", "#808000", "#6B8E23", "#2E8B57", "#3CB371", "#228B22", "#006400", "#20B2AA", "#48D1CC", "#40E0D0",
  "#00BFFF", "#4169E1", "#6495ED", "#4682B4", "#B0C4DE", "#D8BFD8", "#DDA0DD", "#EE82EE", "#FF00FF", "#DA70D6",
  "#FF1493", "#C71585", "#FF4500", "#FF6347", "#FF69B4", "#FFB6C1", "#FFC0CB", "#F08080", "#E9967A", "#F4A460",
  "#D2B48C", "#F5DEB3", "#FAEBD7", "#FFE4B5", "#FFDAB9", "#FFFAF0", "#FFFFF0", "#F0E68C", "#BDB76B", "#E6E6FA",
  "#FFF0F5", "#FFF5EE", "#F0FFF0", "#F5FFFA", "#F0FFFF", "#E0FFFF", "#AFEEEE", "#7FFFD4", "#40E0D0", "#00CED1",
  "#5F9EA0", "#4682B4", "#B0C4DE", "#ADD8E6", "#87CEFA", "#87CEEB", "#00BFFF", "#1E90FF", "#6495ED", "#4169E1",
  "#0000FF", "#0000CD", "#00008B", "#000080", "#191970", "#8A2BE2", "#6A5ACD", "#483D8B", "#7B68EE", "#9370DB"
];
    const idx = Math.floor(Math.random() * (1000 - 1) + 1);
    return colors[idx % colors.length];
}
