function DetectDoor () {
    if (!(inRange(currentDirection))) {
        serial.writeLine("\"Door is moving\"")
        radio.sendString("moving")
        basic.pause(1000)
    } else {
        for (let index = 0; index < 4; index++) {
            basic.pause(500)
            currentDirection = Math.ceil(input.compassHeading())
            if (!(inRange(currentDirection))) {
                serial.writeLine("\"Door is still moving\"")
                radio.sendString("still moving")
                break;
            } else {
                stopTime2 += 1
            }
        }
        if (stopTime2 == 4) {
            serial.writeLine("\"Door is closed")
            radio.sendString("closed")
            basic.pause(1000)
        }
        stopTime2 = 0
    }
}
function inRange (num: number) {
    serial.writeLine("" + (num - initialDirection))
    if (Math.abs(num - initialDirection) <= 3) {
        return true
    }
    return false
}
input.onButtonPressed(Button.A, function () {
    Restart()
})
function Restart () {
    start = 1
    initialDirection = Math.ceil(input.compassHeading())
    currentDirection = initialDirection
    stopTime2 = 0
}
input.onButtonPressed(Button.B, function () {
    start = 0
})
let initialDirection = 0
let stopTime2 = 0
let currentDirection = 0
let start = 0
start = 0
radio.setGroup(24)
basic.forever(function () {
    if (start == 1) {
        currentDirection = Math.ceil(input.compassHeading())
        DetectDoor()
    } else {
        serial.writeLine("\"Device is not running\"")
        radio.sendString("not running")
        basic.pause(1000)
    }
})
