import hashlib
import jwt
from datetime import datetime as dt, timedelta as td, timezone as tz
from api.models.user import User

class UtilityService:

    # It encrypts the password
    def encryptPassword(self, password: str) -> str:

        try:

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

        except ValueError as e:

            # Send the exception
            raise e


    # It creates the JWT
    def createToken(self, userFound: User):

        try:

            # Create a diccionary which it will hold the data
            payload = {
                'id': userFound.id,
                'exp': dt.now(tz.utc) + td(minutes=60),
                'iat': dt.now(tz.utc)
            }

            # Create the token
            token = jwt.encode(payload, 'secret', algorithm = 'HS256')

            return token

        except ValueError as e:

            # Send the exception
            raise e

    # It gets the user Id from the token
    def getUserToken(self, token: str):

        try:

            # Decode the token
            payload = jwt.decode(token, 'secret', algorithms = ['HS256'])

            return payload['id']

        # In case that the token has expired
        except jwt.ExpiredSignatureError:

            # Send the exception
            raise ValueError("User with an expired session. You must log in once again!")

        # Any other exception
        except ValueError as e:

            # Send the exception
            raise e