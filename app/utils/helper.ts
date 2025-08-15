// Predefined background colors
const COLORS = [
    'rgba(173, 216, 230, 0.5)', // light blue
    'rgba(255, 228, 181, 0.5)', // light orange
    'rgba(152, 251, 152, 0.5)', // light green
    'rgba(221, 160, 221, 0.5)', // light purple
    'rgba(255, 182, 193, 0.5)'  // light pink
];

// Function to get a random color
export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
};