import random
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from model import User, OTPLog
from sqlalchemy import select
# from models import User, OTPLog 



async def generate_otp(db: AsyncSession, phone: str):
    """Generate 4-digit OTP and store in database"""

    # generate 4-digit OTP
    otp = str(random.randint(1000, 9999))

    # for dev print otp to console
    print(f"\n{'='*50}")
    print(f"Generated OTP for {phone}: {otp}")
    print(f"{'='*50}\n")

    # store OTP in database
    result = await db.execute(select(User).where(User.phone == phone))
    user = result.scalars().first()
    if user:
        user.otp = otp
        user.otp_expiry = datetime.utcnow() + timedelta(minutes=5)
    else:
        # create temp otp log
        otp_log = OTPLog(phone=phone, otp=otp)
        db.add(otp_log)

    await db.commit()

    return otp

async def verify_otp(db: AsyncSession, phone: str, otp: str):
    """OTP verification"""

    result = await db.execute(select(User).where(User.phone == phone))
    user = result.scalars().first()

    if user:
        # check otp matching and not expired
        if user.otp == otp and user.otp_expiry and user.otp_expiry > datetime.utcnow():
            user.otp = None
            user.otp_expiry = None
            await db.commit()
            return user, True
    else:
        # check otp log for new_user
        result = await db.execute(
            select(OTPLog).where(
                (OTPLog.phone == phone) & (OTPLog.otp == otp) & (OTPLog.is_verified == False)
            )
        )
        
        otp_log = result.scalar().first()
        
        if otp_log and otp_log.created_at > datetime.utcnow() - timedelta(minutes=5):
            otp_log.is_verified = True
            
            # create new user 
            new_user = User(phone=phone)
            db.add(new_user)
            await db.commit()
            
            # Refresh to get generated ID if needed
            await db.refresh(new_user)
            return new_user, True

    return None, False