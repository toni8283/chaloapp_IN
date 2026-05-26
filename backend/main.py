from fastapi import FastAPI
from pydantic import BaseModel
from database import AsyncSessionLocal, init_db
from contextlib import asynccontextmanager
from auth import generate_otp, verify_otp

app = FastAPI()

@app.on_event("startup")
async def startup():
    await init_db()

class PhoneRequest(BaseModel):
    phone: str


@app.post("/generate-otp")
async def generate_otp_endpoint(request: PhoneRequest):
    async with AsyncSessionLocal() as db:
        await generate_otp(db, request.phone)

    return {"message": "OTP generated and sent to phone"}



@app.get("/")
def home():
    return {"message": "chalo backend running"}