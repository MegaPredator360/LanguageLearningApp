class ResponseAPI:
    def __init__(self, status: bool = False, value: any = "", msg: str = ""):
        self.status = status
        self.value = value
        self.msg = msg