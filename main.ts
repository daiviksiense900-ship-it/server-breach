// --- Game State Setups ---
enum Difficulty { Easy, Normal, Hard }
let currentDifficulty = Difficulty.Normal
let gameActive = false
let inApp = false
let currentApp = 0 // 1 = Device Hacker, 2 = Server Breacher
let currentLevel = 1
let targetWord = ""
let baseTime = 8
let maxLevel = 10
let totalPoints = 0

// --- Word Repositories (Upgraded to extreme, highly confusing hacker symbols) ---
const deviceShort = ["p1ng", "r00t", "bYt3", "h4sh", "v1an", "k1ll", "p0rt", "g4te", "buFF", "p4tc"]
const deviceMedium = ["cYb3r", "pR0xY", "aDm1n", "t0k3n", "l0g1c", "cH41n", "bR34cH", "1nJ3ct", "vAulT", "c1phR"]
const deviceLong = ["0xDEADBEEF", "SYS_CRASH!", "NET_SHUT_99", "OVERRIDE_X", "KERN_PANIC", "PORT_BLOCK", "FIREWALL_Z", "ROOT_SHELL", "TOKEN_VOID", "PROXY_JAM"]
const serverShort = ["daTa", "l1nk", "coDe", "n0de", "sYnc", "mAcr", "cl0u", "pYld", "mAlw", "encR"]
const serverMedium = ["f1reWl", "gAtwY", "pYl0ad", "mAlwRe", "encRpt", "decRpt", "expL0t", "conSle", "traCkr", "pAckt"]
const serverLong = ["CRITICAL_CORE_ERR", "QUANTUM_SECURE_NODE", "BRUTE_FORCE_INIT_9", "ZERO_DAY_EXPLOIT_V4", "MAINFRAME_OVERLOAD_XYZ"]

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
let appCursor = 0

// ==========================================
// CORE FUNCTIONS - INSTANTIATE CANVAS CORRECTLY
// ==========================================
function drawHackingInterface(color: number) {
    let bg = scene.backgroundImage()
    bg.fill(15)
    bg.fillRect(2, 12, 56, 105, 0)
    bg.drawRect(1, 11, 58, 107, 12)
    for (let i = 0; i < 8; i++) {
        let printIdx = (matrixIndex + i) % matrixLines.length
        bg.print(matrixLines[printIdx], 4, 16 + (i * 12), 7)
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
        screen.print("BREACHING FW...", 72, 38, 5)
        screen.print("PROGRESS: " + (currentTick * 33) + "%", 72, 54, 7)
        screen.fillRect(72, 66, 70, 6, 15)
        screen.drawRect(71, 65, 72, 8, color)
        screen.fillRect(72, 66, Math.floor(currentTick * 23.3), 6, 2)
        music.playTone(Note.C5, 40)
        pause(1000)
    }
    // Phase 2: Decrypt & Reveal Code (3 Seconds to Memorize)
    for (let currentTick = 1; currentTick <= 3; currentTick++) {
        if (!inApp) break;
        matrixIndex = (matrixIndex + 1) % matrixLines.length
        drawHackingInterface(color)
        let screen = scene.backgroundImage()
        screen.print(levelTitle, 72, 22, color)
        if (currentTick % 2 == 1) {
            screen.print("INTERCEPTED!!", 72, 34, 2)
            screen.print(wordLabel, 66, 46, 9)
        } else {
            screen.print("MEMORIZE MATRIX", 72, 34, 9)
            screen.print(wordLabel, 66, 46, 10)
        }
        screen.print("LOCK IN: " + (4 - currentTick) + "s", 72, 62, 4)
        music.playTone(Note.F5, 40)
        pause(1000)
    }
    // Phase 3: Hide Code & Wait for Entry
    drawHackingInterface(color)
    let finalScreen = scene.backgroundImage()
    finalScreen.print(levelTitle, 72, 22, color)
    finalScreen.print("DECRYPTING...", 72, 38, 2)
    finalScreen.print("[HIDDEN CODE]", 72, 52, 12)
}

function triggerLethalCountermeasure() {
    inApp = false
    gameActive = false
    info.stopCountdown()
    totalPoints = Math.max(0, totalPoints - 250)

    let alertBg = image.create(160, 120)
    alertBg.fill(2)
    scene.setBackgroundImage(alertBg)

    alertBg.fillRect(10, 30, 140, 60, 15)
    alertBg.drawRect(9, 29, 142, 62, 2)
    alertBg.print("SECURITY SENTRY TRIPPED", 15, 42, 2)
    alertBg.print("COUNTERMEASURE DEPLOYED", 12, 62, 2)
    alertBg.print("-250 CREDITS DETONATED", 15, 78, 4)

    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    scene.cameraShake(10, 800)
    pause(1500)
    showDesktopEnvironment()
}

function startDeviceHacker() {
    currentLevel = 1
    if (currentDifficulty == Difficulty.Easy) baseTime = 12
    else if (currentDifficulty == Difficulty.Normal) baseTime = 8
    else baseTime = 5
    info.setScore(0)
    nextDeviceCycle()
}

function nextDeviceCycle() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    let deviceAlertColor = 6
    if (currentLevel > 3) deviceAlertColor = 4
    if (currentLevel > 7) deviceAlertColor = 2
    let wordPool: string[] = []
    if (currentLevel <= 3) wordPool = deviceShort
    else if (currentLevel <= 6) wordPool = deviceMedium
    else wordPool = deviceLong
    targetWord = wordPool[Math.randomRange(0, wordPool.length - 1)]

    executeHackingFlowSequence(deviceAlertColor, "DEV_NODE: " + currentLevel, targetWord)
    let dynamicallyCalculatedTime = Math.max(2, baseTime - Math.floor(currentLevel * 1.2))
    info.startCountdown(dynamicallyCalculatedTime)

    control.runInParallel(function () {
        pause(200)
        if (inApp && currentApp == 1) {
            let userBypassKey = game.askForString("Enter Decayed Matrix:", targetWord.length)
            if (userBypassKey == targetWord) {
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
                let scoreReward = (200 * currentLevel)
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
                    nextDeviceCycle()
                }
            } else {
                triggerLethalCountermeasure()
            }
        }
    })
}

function startServerBreacher() {
    currentLevel = 1
    baseTime = 7
    info.setScore(0)
    nextBreachCycle()
}

function nextBreachCycle() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    let wordPool: string[] = []
    if (currentLevel <= 3) wordPool = serverShort
    else if (currentLevel <= 6) wordPool = serverMedium
    else wordPool = serverLong
    targetWord = wordPool[Math.randomRange(0, wordPool.length - 1)]

    executeHackingFlowSequence(10, "SERVER: " + currentLevel, targetWord)
    let dynamicallyCalculatedTime = Math.max(2, baseTime - Math.floor(currentLevel * 1.0))
    info.startCountdown(dynamicallyCalculatedTime)

    control.runInParallel(function () {
        pause(200)
        if (inApp && currentApp == 2) {
            let userBypassKey = game.askForString("Enter Decrypted Hash:", targetWord.length)
            if (userBypassKey == targetWord) {
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
                let scoreReward = (350 * currentLevel)
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
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    info.stopCountdown()

    // Explicitly generate canvas image shell to fix black screens
    let deskBg = image.create(160, 120)
    deskBg.fill(13)
    scene.setBackgroundImage(deskBg)

    updateDesktopDisplay()
}

function updateDesktopDisplay() {
    let bg = scene.backgroundImage()
    bg.fill(13)
    bg.fillRect(0, 0, 160, 10, 15)
    bg.print("DECK_OS v5.0 // ONLINE", 4, 1, 0)
    bg.print("CRED: " + totalPoints, 100, 1, 2)

    bg.fillRect(10, 20, 140, 90, 13)

    bg.fillRect(20, 35, 120, 20, appCursor == 0 ? 2 : 0)
    bg.print(" DEVICE HACKER", 25, 41, appCursor == 0 ? 15 : 6)

    bg.fillRect(20, 65, 120, 20, appCursor == 1 ? 2 : 0)
    bg.print(" SERVER BREACHER", 25, 71, appCursor == 1 ? 15 : 6)
}

// ==========================================
// CONTROLS & EVENT LOOPS
// ==========================================
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!inApp) {
        appCursor = appCursor === 0 ? 1 : 0
        updateDesktopDisplay()
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!inApp) {
        appCursor = appCursor === 0 ? 1 : 0
        updateDesktopDisplay()
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!inApp) {
        inApp = true
        gameActive = true
        if (appCursor == 0) {
            currentApp = 1
            startDeviceHacker()
        } else {
            currentApp = 2
            startServerBreacher()
        }
    }
})

// Run program structure instantly on game startup block
showDesktopEnvironment()
