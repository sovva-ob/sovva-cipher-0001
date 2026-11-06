import sys

from engine import cipher

print("cipher initialized")

mode = input("encrypt or decrypt? ")

try:
    shift = int(input("enter shift amount: "))
except ValueError:
    print("invalid number")
    sys.exit()

if mode == "encrypt":
    print("encrypt selected")
elif mode == "decrypt":
    shift = -shift
    print("decrypt selected")
else:
    print("invalid mode")
    sys.exit()

message = input("enter your message: ")

print (f"{mode}ion: {cipher(message, shift)}")