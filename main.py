import sys

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

def cipher(message, shift):
    encrypted = ""
    ascii_min = 32
    ascii_max = 126
    ascii_range = ascii_max - ascii_min + 1

    for character in message:
        position = ord(character) - ascii_min
        shifted = (position + shift) % ascii_range
        encrypted = encrypted + chr(shifted + ascii_min)
    
    return encrypted

print (f"{mode}ion: {cipher(message, shift)}")