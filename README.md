# Pranush's Adventure

A fun 2D platformer game built with HTML5 Canvas and vanilla JavaScript, featuring Pranush as the heroic character!

## How to Play

### Desktop
1. Open `index.html` in your web browser
2. Use **Arrow Keys** or **WASD** to move left and right
3. Press **Space** to jump
4. Press **P** to pause the game
5. Click the **🔊 button** in the top-right to toggle sound effects

### Mobile
1. Open the game in your mobile browser
2. Use the **◀ ▶ buttons** at the bottom-left to move left and right
3. Tap the **JUMP button** at the bottom-right to jump
4. Touch controls automatically appear on mobile devices

### Gameplay
6. Collect coins for points
7. Stomp on enemies by jumping on them
8. Grab power-ups to grow bigger and stronger
9. Reach the green flag to complete each level!

## Adding Your Friend's Picture as the Character

To use your friend's picture as the game character, follow these steps:

### Option 1: Simple Approach (Recommended)
1. Take or select a clear photo of your friend
2. Use an online tool like [remove.bg](https://www.remove.bg) to remove the background
3. Download the PNG file with transparent background
4. Resize it to **64x64** or **128x128** pixels using:
   - Online: [Pixlr](https://pixlr.com/x/), [Photopea](https://www.photopea.com/)
   - Desktop: Paint, GIMP, Photoshop, Preview (Mac)
5. Save the file as `player.png` in the `assets/images/` folder

### Option 2: Without Transparent Background
If you can't remove the background:
1. Crop the image to a square (same width and height)
2. Resize to 64x64 or 128x128 pixels
3. Save as `player.png` in the `assets/images/` folder
4. The game will display it with a white/colored border

### Image Requirements:
- **Format**: PNG (preferred for transparency)
- **Size**: 64x64 or 128x128 pixels
- **Location**: `assets/images/player.png`
- **Transparency**: Optional but looks better

### Testing:
After adding the image:
1. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
2. Start a new game
3. You should see your custom character!

If the image doesn't load, the game will show a default red character instead.

## Game Features

### Three Levels
- **Level 1**: Tutorial level - Learn the basics
- **Level 2**: Intermediate - Moving platforms and more enemies
- **Level 3**: Advanced - Complex platforming challenges

### Gameplay Elements
- **Platforms**: Solid and moving platforms
- **Enemies**:
  - Walkers: Patrol back and forth on platforms
  - Flyers: Fly in wave patterns
- **Collectibles**:
  - Coins: Worth 10 points each
  - Power-ups: Grow bigger, worth 100 points
- **Lives System**: Start with 3 lives
- **Scoring**: Collect coins and defeat enemies for points

### Power-Up Effects
- Character grows bigger
- Lasts for 10 seconds
- Taking damage while powered up removes the power-up instead of a life

### Sound Effects
- **Jump**: Upward sweep sound when jumping
- **Coin Collect**: Pleasant "ding" when collecting coins
- **Power-up**: Ascending arpeggio when grabbing power-ups
- **Enemy Stomp**: Low thump when defeating enemies
- **Damage**: Harsh sound when taking damage
- **Level Complete**: Victory fanfare (3 notes)
- **Game Over**: Descending sad melody
- **Toggle**: Click the 🔊 button in the HUD to mute/unmute

## File Structure

```
blackhole/
├── index.html              # Main game file
├── css/
│   └── style.css          # Game styling
├── js/
│   ├── game.js            # Main game loop
│   ├── player.js          # Player character
│   ├── platform.js        # Platform objects
│   ├── enemy.js           # Enemy AI
│   ├── collectible.js     # Coins and power-ups
│   ├── level.js           # Level management
│   ├── physics.js         # Physics engine
│   ├── input.js           # Keyboard controls
│   └── utils.js           # Helper functions
├── assets/
│   └── images/
│       └── player.png     # ← PUT YOUR FRIEND'S IMAGE HERE!
└── levels/
    ├── level1.js          # Level 1 data
    ├── level2.js          # Level 2 data
    └── level3.js          # Level 3 data
```

## Tips & Tricks

1. **Stomping Enemies**: Jump on top of enemies to defeat them (50 points)
2. **Moving Platforms**: Time your jumps carefully
3. **Power-ups**: Use power-ups strategically for tough enemy sections
4. **Invincibility**: After taking damage, you get 2 seconds of invincibility (blinking effect)
5. **Falling**: Don't fall off the bottom of the screen!

## Customization Ideas

Want to modify the game? Here are some easy tweaks:

### Change Game Difficulty
Edit `js/physics.js`:
- Increase `GRAVITY` for harder jumping
- Increase `JUMP_VELOCITY` for higher jumps
- Adjust `MOVE_SPEED` for faster/slower movement

### Change Colors
Edit `css/style.css` to change menu colors and backgrounds

### Create New Levels
Copy one of the level files in `levels/` and modify the platform positions, enemies, and collectibles!

### Adjust Character Size
Edit `js/player.js` and change `this.width` and `this.height` in the constructor

## Troubleshooting

**Character image not showing?**
- Check that the file is named exactly `player.png`
- Make sure it's in the `assets/images/` folder
- Try hard-refreshing the browser (Ctrl+F5)
- Check browser console (F12) for errors

**Game not starting?**
- Make sure JavaScript is enabled in your browser
- Open browser console (F12) to check for errors
- Try a different browser (Chrome, Firefox, Safari, Edge)

**Performance issues?**
- Close other browser tabs
- Try a modern browser
- The game runs at 60 FPS on most devices

## Credits

Built with vanilla JavaScript and HTML5 Canvas - no frameworks required!

Enjoy your custom Mario-like platformer! 🎮
