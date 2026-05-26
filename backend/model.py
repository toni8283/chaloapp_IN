from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(15), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=True) 
    age = Column(Integer, nullable=True)
    gender = Column(String(10), nullable=True)
    photo_url = Column(String(255), nullable=True)
    is_profile_complete = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # session management
    otp = Column(String(4), nullable=True)
    otp_expiry = Column(DateTime, nullable=True)

    def _to_dict(self):
        return {
            "id": self.id,
            "phone": self.phone,
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "photo_url": self.photo_url,
            "is_profile_complete": self.is_profile_complete,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

class OTPLog(Base):
    __tablename__ = 'otp_logs'

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(15), nullable=False, index=True)
    otp = Column(String(6), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_verified = Column(Boolean, default=False)

