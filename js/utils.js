// Utility functions for the game

// Helper to generate random numbers
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Helper for color generation
function randomColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Clamp a value between min and max
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Check if two rectangles overlap (AABB collision)
function rectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Linear interpolation
function lerp(start, end, t) {
    return start + (end - start) * t;
}
