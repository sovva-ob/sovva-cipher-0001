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