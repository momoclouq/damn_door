def DetectDoor():
    global currentDirection, stopTime2
    if currentDirection != initialDirection:
        serial.write_line("\"Door is moving\"")
        basic.pause(1000)
    elif currentDirection == initialDirection:
        for index in range(4):
            basic.pause(500)
            currentDirection = input.compass_heading()
            if currentDirection != initialDirection:
                serial.write_line("\"Door is still moving\"")
                break
            else:
                stopTime2 += 1
        if stopTime2 == 4:
            serial.write_line("\"Door is closed")
            basic.pause(1000)
        stopTime2 = 0

def on_button_pressed_a():
    Restart()
input.on_button_pressed(Button.A, on_button_pressed_a)

def Restart():
    global start, initialDirection, currentDirection, stopTime1, stopTime2
    start = 1
    initialDirection = input.compass_heading()
    currentDirection = initialDirection
    stopTime1 = 0
    stopTime2 = 0

def on_button_pressed_b():
    global start
    start = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

stopTime1 = 0
stopTime2 = 0
initialDirection = 0
currentDirection = 0
start = 0
start = 0
radio.set_group(1)

def on_forever():
    global currentDirection
    if start == 1:
        currentDirection = input.compass_heading()
        DetectDoor()
    else:
        serial.write_line("\"Device is not running\"")
        basic.pause(1000)
basic.forever(on_forever)
