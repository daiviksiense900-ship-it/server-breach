// --- Game State Setups ---
enum Difficulty { Easy, Normal, Hard }
let currentDifficulty = Difficulty.Normal
let gameActive = false
let inApp = false
let inShop = false
let currentApp = 0 // 1 = Hacker Terminal, 2 = Server Breacher
let currentLevel = 1
let targetWord = ""
let baseTime = 12
let maxLevel = 10
let totalPoints = 0 // Persistent currency across games

// --- Upgrade Shop Variables ---
let upgradeHackSpeedLvl = 0
let upgradePointMultLvl = 0
let ownedEquipmentLvl = 0 // 0 = Basic Deck, 1 = Advanced Rig, 2 = Quantum Core
const maxUpgradeLvl = 3

// --- Word Repositories ---
const shortWords = ["node", "link", "byte", "code", "ping", "port", "root", "hash", "kill", "vlan"]
const mediumWords = ["cyber", "proxy", "admin", "token", "logic", "patch", "cloud", "phish", "breach", "inject"]
const longWords = ["network", "firewall", "gateway", "payload", "malware", "encrypt", "decrypt", "exploit", "console", "tracker"]
const extremeWords = ["mainframeoverride", "quantumencryption", "bruteforcesequence", "zero-dayexploit", "superfirewall"]

// --- System Auto-Code Terminal Lines ---
const matrixLines = [
    "sh ./exploit.sh",
    "CONNECTING...",
    "PORT 80: OPEN",
    "BYPASSING FW...",
    "INJECTING PAYLOAD",
    "BUFFER OVERFLOW",
    "SYS_ROOT=TRUE",
    "FETCHING KEYS...",
    "CRACKING HASH..."
]
let matrixIndex = 0

// --- UI Navigation ---
let menuCursor = 0
let appCursor = 0
let shopCursor = 0

// ==========================================
// CORE FUNCTIONS DEFINED FIRST TO FIX ERRORS
// ==========================================

function drawHackingInterface(color: number) {
    let bg = scene.backgroundImage()
    bg.fill(15)

    bg.fillRect(2, 12, 56, 105, 0)

    let sideBorder = (ownedEquipmentLvl == 0) ? 12 : (ownedEquipmentLvl == 1 ? 7 : 10)
    bg.drawRect(1, 11, 58, 107, sideBorder)

    for (let i = 0; i < 8; i++) {
        let printIdx = (matrixIndex + i) % matrixLines.length
        bg.print(matrixLines[printIdx], 4, 16 + (i * 12), (ownedEquipmentLvl == 1) ? 2 : 7)
    }

    bg.fillRect(64, 15, 92, 85, 11)
    bg.fillRect(68, 19, 84, 50, 0)
    bg.drawRect(67, 18, 86, 52, color)
}

function executeHackingFlowSequence(color: number, levelTitle: string, wordLabel: string) {
    info.stopCountdown()

    // Phase 1: Firewall Hack (3 Seconds)
    for (let currentTick = 1; currentTick <= 3; currentTick++) {
        if (!inApp) break;
        matrixIndex = (matrixIndex + 1) % matrixLines.length
        drawHackingInterface(color)

        let screen = scene.backgroundImage()
        screen.print(levelTitle, 72, 22, color)
        screen.print("BYPASSING FW...", 72, 38, 5)
        screen.print("PROGRESS: " + (currentTick * 33) + "%", 72, 54, 7)

        screen.fillRect(72, 66, 70, 6, 15)
        screen.drawRect(71, 65, 72, 8, color)
        screen.fillRect(72, 66, Math.floor(currentTick * 23.3), 6, 4)

        music.playTone(Note.C5, 80)
        pause(1000)
    }

    // Phase 2: Decrypt & Reveal Code (3 Seconds)
    for (let currentTick = 1; currentTick <= 3; currentTick++) {
        if (!inApp) break;
        matrixIndex = (matrixIndex + 1) % matrixLines.length
        drawHackingInterface(color)

        let screen = scene.backgroundImage()
        screen.print(levelTitle, 72, 22, color)

        if (currentTick % 2 == 1) {
            screen.print("KEY CAPTURED!", 72, 36, 4)
            screen.print(wordLabel.toUpperCase(), 72, 48, 9)
        } else {
            screen.print("MEMORIZE KEY:", 72, 36, 9)
            screen.print(wordLabel.toUpperCase(), 72, 48, 10)
        }

        screen.print("REVEAL: " + (4 - currentTick) + "s", 72, 62, 7)

        music.playTone(Note.E5, 80)
        pause(1000)
    }

    // Phase 3: Hide Code & Wait for Entry
    drawHackingInterface(color)
    let finalScreen = scene.backgroundImage()
    finalScreen.print(levelTitle, 72, 22, color)
    finalScreen.print("DECRYPTING...", 72, 38, 2)
    finalScreen.print("[HIDDEN CODE]", 72, 52, 12)
}

// --- Lethal Security Sentry Countermeasure Sequence ---
function triggerLethalCountermeasure() {
    inApp = false
    gameActive = false
    info.stopCountdown()

    let alertBg = image.create(160, 120)
    alertBg.fill(2)
    scene.setBackgroundImage(alertBg)

    scene.backgroundImage().fillRect(10, 30, 140, 60, 15)
    scene.backgroundImage().drawRect(9, 29, 142, 62, 2)
    scene.backgroundImage().print("SECURITY SENTRY TRIPPED", 15, 42, 2)
    scene.backgroundImage().print("COUNTERMEASURE DEPLOYED", 12, 62, 2)
    scene.backgroundImage().print("* BAM *", 60, 78, 9)

    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    scene.cameraShake(8, 600)
    pause(1000)

    showDesktopEnvironment()
}

// --- App 1 Execution Sequence: Hacker Terminal ---
function startHackerTerminal() {
    currentLevel = 1
    if (currentDifficulty == Difficulty.Easy) baseTime = 18
    else if (currentDifficulty == Difficulty.Normal) baseTime = 12
    else baseTime = 8

    baseTime += (upgradeHackSpeedLvl * 3)
    info.setScore(0)
    nextHackerCycle()
}

function nextHackerCycle() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)

    let deviceAlertColor = 6
    if (currentLevel > 3) deviceAlertColor = 4
    if (currentLevel > 7) deviceAlertColor = 2

    let wordPool: string[] = []
    if (currentLevel <= 2) wordPool = shortWords
    else if (currentLevel <= 5) wordPool = mediumWords
    else if (currentLevel <= 8) wordPool = longWords
    else wordPool = extremeWords

    targetWord = wordPool[Math.randomRange(0, wordPool.length - 1)]

    executeHackingFlowSequence(deviceAlertColor, "NODE: " + currentLevel, targetWord)

    let dynamicallyCalculatedTime = Math.max(3, baseTime - Math.floor(currentLevel * 0.8))
    info.startCountdown(dynamicallyCalculatedTime)

    control.runInParallel(function () {
        pause(200)
        if (inApp && currentApp == 1) {
            let userBypassKey = game.askForString("Enter Intercepted Key:", targetWord.length)

            if (userBypassKey.toLowerCase() == targetWord.toLowerCase()) {
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)

                let scoreReward = (150 * currentLevel) * (upgradePointMultLvl + 1)
                info.changeScoreBy(scoreReward)
                totalPoints += scoreReward
                currentLevel++

                if (currentLevel > maxLevel) {
                    inApp = false
                    gameActive = false
                    info.stopCountdown()
                    control.runInParallel(function () {
                        game.gameOver(true)
                    })
                } else {
                    nextHackerCycle()
                }
            } else {
                triggerLethalCountermeasure()
            }
        }
    })
}

// --- App 2 Execution Sequence: Server Breacher ---
function startServerBreacher() {
    currentLevel = 1
    baseTime = 10 + (upgradeHackSpeedLvl * 2)
    info.setScore(0)
    nextBreachCycle()
}

function nextBreachCycle() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)

    let wordPool = longWords.concat(extremeWords)
    targetWord = wordPool[Math.randomRange(0, wordPool.length - 1)]

    executeHackingFlowSequence(10, "SERVER: " + currentLevel, targetWord)

    let dynamicallyCalculatedTime = Math.max(2, baseTime - Math.floor(currentLevel * 0.5))
    info.startCountdown(dynamicallyCalculatedTime)

    control.runInParallel(function () {
        pause(200)
        if (inApp && currentApp == 2) {
            let userBypassKey = game.askForString("Enter Decrypted Hash:", targetWord.length)

            if (userBypassKey.toLowerCase() == targetWord.toLowerCase()) {
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)

                let scoreReward = (300 * currentLevel) * (upgradePointMultLvl + 1)
                info.changeScoreBy(scoreReward)
                totalPoints += scoreReward
                currentLevel++
                nextBreachCycle()
            } else {
                triggerLethalCountermeasure()
            }
        }
    })
}

// --- Desktop Environment Boot Sequence ---
function showDesktopEnvironment() {
    gameActive = false
    inApp = false
    inShop = false
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    info.stopCountdown()

    let deskBg = image.create(160, 120)
    if (ownedEquipmentLvl == 0) deskBg.fill(13)
    else if (ownedEquipmentLvl == 1) deskBg.fill(11)
    else deskBg.fill(14)

    scene.setBackgroundImage(deskBg)

    deskBg.fillRect(0, 0, 160, 10, 15)
    deskBg.print("DECK_OS v4.0", 4, 1, 0)
    deskBg.print("PTS: " + totalPoints, 100, 1, 2)

    updateDesktopDisplay()
}

function updateDesktopDisplay() {
    let bg = scene.backgroundImage()
    let textCol = (ownedEquipmentLvl == 1) ? 2 : 6
    let selectedTextCol = (ownedEquipmentLvl == 2) ? 10 : 15

    if (ownedEquipmentLvl == 0) bg.fillRect(10, 20, 140, 90, 13)
    else if (ownedEquipmentLvl == 1) bg.fillRect(10, 20, 140, 90, 11)
    else bg.fillRect(10, 20, 140, 90, 14)

    bg.fillRect(20, 25, 120, 20, appCursor == 0 ? 5 : 0)
    bg.print(" HACKER TERMINAL", 25, 31, appCursor == 0 ? selectedTextCol : textCol)

    bg.fillRect(20, 50, 120, 20, appCursor == 1 ? 5 : 0)
    bg.print(" SERVER BREACHER", 25, 56, appCursor == 1 ? selectedTextCol : textCol)

    bg.fillRect(20, 75, 120, 20, 2)
    bg.print(" PRESS (B): BLACK MARKET", 22, 81, 15)

    bg.print("D-Pad Select & Press (A) to Run", 5, 105, 9)
}

// --- Dark Web Black Market Upgrade Shop ---
function showUpgradeShop() {
    inShop = true
    let bg = scene.backgroundImage()
    bg.fill(15)

}