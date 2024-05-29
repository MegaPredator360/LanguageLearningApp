import hashlib

class UtilityService:

    # It encrypts the password
    def encryptPassword(self, password: str) -> str:

        # Create a SHA256 hash object
        hash_obj = hashlib.sha256()

        # Convert the password to bytes
        password_bytes = password.encode()

        # Update the hash object with the password bytes
        hash_obj.update(password_bytes)

        # Get the hashed password in bytes
        hashed_bytes = hash_obj.digest()

        # Convert the hashed bytes to a hexadecimal string
        hashed_hex_string = hashed_bytes.hex()

        # Return the hexadecimal string representation of the hashed password
        return hashed_hex_string
