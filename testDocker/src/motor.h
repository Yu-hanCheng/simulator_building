#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
enum MotorPinID {
    L_F = 0,
    L_B,
    R_F,
    R_B,
    NUM_OF_MOTOR_PIN
};
enum stat{LOW, HIGH};
void digitalWrite();
void analogWrite();
void delay(int time);